import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, shadows, borderRadius } from '../theme';
import { useAuthStore } from '../store/authStore';

export default function DashboardScreen() {
  const { user, logout } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.email}>{user?.email || 'User'}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Healora Score</Text>
        <Text style={styles.scoreValue}>--</Text>
        <Text style={styles.scoreDesc}>Complete onboarding to calculate</Text>
      </View>

      <View style={styles.quickStats}>
        <View style={[styles.statCard, shadows.sm]}>
          <Text style={styles.statValue}>--</Text>
          <Text style={styles.statLabel}>Sleep</Text>
        </View>
        <View style={[styles.statCard, shadows.sm]}>
          <Text style={styles.statValue}>--</Text>
          <Text style={styles.statLabel}>Steps</Text>
        </View>
        <View style={[styles.statCard, shadows.sm]}>
          <Text style={styles.statValue}>--</Text>
          <Text style={styles.statLabel}>Weight</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Plan</Text>
        <View style={[styles.emptyCard, shadows.sm]}>
          <Text style={styles.emptyText}>No plan for today</Text>
          <Text style={styles.emptySubtext}>Set your health goals to get started</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.xl, paddingVertical: spacing.lg,
  },
  greeting: { ...typography.body, color: colors.textSecondary },
  email: { ...typography.h3, color: colors.text },
  logoutBtn: { padding: spacing.sm },
  logoutText: { ...typography.bodyBold, color: colors.primary },
  scoreCard: {
    marginHorizontal: spacing.xl, padding: spacing.xl,
    backgroundColor: colors.primary, borderRadius: borderRadius.lg,
    alignItems: 'center', marginBottom: spacing.xl,
  },
  scoreLabel: { ...typography.caption, color: colors.textInverse, opacity: 0.8 },
  scoreValue: { ...typography.h1, color: colors.textInverse, marginVertical: spacing.xs },
  scoreDesc: { ...typography.caption, color: colors.textInverse, opacity: 0.7 },
  quickStats: {
    flexDirection: 'row', paddingHorizontal: spacing.xl, gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1, backgroundColor: colors.surface, borderRadius: borderRadius.md,
    padding: spacing.md, alignItems: 'center',
  },
  statValue: { ...typography.h3, color: colors.text },
  statLabel: { ...typography.small, color: colors.textSecondary, marginTop: spacing.xs },
  section: { paddingHorizontal: spacing.xl },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
  emptyCard: {
    backgroundColor: colors.surface, borderRadius: borderRadius.md,
    padding: spacing.xl, alignItems: 'center',
  },
  emptyText: { ...typography.bodyBold, color: colors.textSecondary, marginBottom: spacing.xs },
  emptySubtext: { ...typography.caption, color: colors.textTertiary },
});
