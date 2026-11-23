import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface WavyBackgroundProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

/**
 * Creates an organic, modern multi-layered wavy & mesh gradient background
 * inspired by Instagram's signature palette (purple, magenta, coral, amber)
 * built purely with React Native shapes and layered translucent circles.
 */
export default function WavyBackground({ style, children }: WavyBackgroundProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Base warm background */}
      <View style={styles.backgroundBase} />

      {/* Decorative organic wavy curved layers */}
      <View style={styles.decorativeLayer} pointerEvents="none">
        {/* Deep Violet / Royal Purple Blob */}
        <View style={styles.blobPurple} />

        {/* Instagram Hot Magenta / Rose Wave */}
        <View style={styles.waveMagenta} />

        {/* Vibrant Coral / Orange Wave */}
        <View style={styles.waveCoral} />

        {/* Golden Amber Sunset Glow */}
        <View style={styles.glowAmber} />

        {/* Soft frosted glass overlay curve */}
        <View style={styles.waveWhiteOverlay} />
      </View>

      {/* Foreground Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FAF5FF',
    overflow: 'hidden',
  },
  backgroundBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFF7ED', // Warm subtle cream/sunset base
  },
  decorativeLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Top right royal purple glow
  blobPurple: {
    position: 'absolute',
    top: -120,
    right: -80,
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: '#7C3AED',
    opacity: 0.85,
    transform: [{ scaleX: 1.4 }, { rotate: '-25deg' }],
  },
  // Large sweeping Instagram magenta curve across the center-top
  waveMagenta: {
    position: 'absolute',
    top: -60,
    left: -120,
    width: 440,
    height: 380,
    borderRadius: 190,
    backgroundColor: '#E1306C',
    opacity: 0.9,
    transform: [{ rotate: '18deg' }, { scaleX: 1.3 }],
  },
  // Warm coral orange wave flowing down the right
  waveCoral: {
    position: 'absolute',
    top: 140,
    right: -100,
    width: 320,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#FD1D1D',
    opacity: 0.82,
    transform: [{ rotate: '-35deg' }],
  },
  // Golden yellow-amber accent in the middle
  glowAmber: {
    position: 'absolute',
    top: 180,
    left: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#FCAF45',
    opacity: 0.78,
  },
  // Soft wavy organic bottom veil
  waveWhiteOverlay: {
    position: 'absolute',
    bottom: -160,
    left: -80,
    width: 550,
    height: 480,
    borderRadius: 240,
    backgroundColor: '#FFFFFF',
    opacity: 0.95,
    transform: [{ rotate: '-12deg' }, { scaleX: 1.2 }],
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
});
