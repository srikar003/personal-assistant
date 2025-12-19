import React, { useEffect, useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import * as Speech from "expo-speech";
import Voice from "@react-native-voice/voice";

const API_BASE = "http://192.168.4.42:3001";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);

    Voice.onSpeechError = (e) => {
      setIsListening(false);
      setResult(`STT error: ${JSON.stringify(e)}`);
    };

    Voice.onSpeechResults = (e) => {
      const transcript = e.value?.[0];
      if (transcript) setText(transcript);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    setResult("");
    try {
      await Voice.start("en-US");
    } catch (e: any) {
      setIsListening(false);
      setResult(`Start failed: ${String(e?.message || e)}`);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch {
      // ignore
    } finally {
      setIsListening(false);
    }
  };

  const send = async () => {
    if (!text.trim()) {
      setResult("Type or speak something first.");
      return;
    }

    setResult("Sending...");
    try {
      const res = await fetch(`${API_BASE}/assistant/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          mode: "voice",
          metadata: { client: "mobile", stt: "react-native-voice" },
        }),
      });

      const json = await res.json();
      setResult(JSON.stringify(json, null, 2));

      const reply = json?.replyText;
      if (typeof reply === "string" && reply.length > 0) {
        Speech.stop();
        Speech.speak(reply, { rate: 1.0 });
      }
    } catch (e: any) {
      setResult(String(e?.message || e));
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 18 }}>Personal Assistant</Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type or hold the mic to talk…"
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      <Pressable
        onPressIn={startListening}
        onPressOut={stopListening}
        style={{
          borderWidth: 1,
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text>{isListening ? "Listening… (release to stop)" : "Hold to Talk 🎤"}</Text>
      </Pressable>

      <Button title="Send to Assistant" onPress={send} />
      <Button title="Stop Speaking" onPress={() => Speech.stop()} />

      <Text style={{ marginTop: 8, fontFamily: "monospace" }}>{result}</Text>
    </View>
  );
}
