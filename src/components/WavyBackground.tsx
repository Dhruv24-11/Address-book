import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface WavyBackgroundProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

/**
 * Clean, subtle, modern gradient wave background
 * using soft slate, indigo, and sky blues for a premium SaaS feel.
 */
export default function WavyBackground({ style, children }: WavyBackgroundProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.backgroundBase} />

      {/* Decorative smooth layered waves */}
      <View style={styles.decorativeLayer} pointerEvents="none">
        {/* Soft deep indigo circle */}
        <View style={styles.blobIndigo} />

        {/* Vibrant sky blue curve */}
        <View style={styles.blobSky} />

        {/* Subtle cyan accent */}
        <View style={styles.blobCyan} />

        {/* Frosted bottom curve transition */}
        <View style={styles.bottomCurve} />
      </View>

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#0F172A',
    overflow: 'hidden',
  },
  backgroundBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0F172A',
  },
  decorativeLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blobIndigo: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: '#3B82F6',
    opacity: 0.35,
    transform: [{ scaleX: 1.3 }],
  },
  blobSky: {
    position: 'absolute',
    top: 40,
    left: -120,
    width: 400,
    height: 380,
    borderRadius: 190,
    backgroundColor: '#1D4ED8',
    opacity: 0.45,
    transform: [{ rotate: '25deg' }],
  },
  blobCyan: {
    position: 'absolute',
    top: 200,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#0284C7',
    opacity: 0.3,
  },
  bottomCurve: {
    position: 'absolute',
    bottom: -180,
    left: -60,
    width: 520,
    height: 440,
    borderRadius: 220,
    backgroundColor: '#1E293B',
    opacity: 0.8,
    transform: [{ rotate: '-10deg' }],
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
});
