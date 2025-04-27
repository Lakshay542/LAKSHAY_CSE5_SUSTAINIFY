import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const P5 = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
  <Image
    source={{
      uri: "https://i.ibb.co/X7zkF0B/avatar.png",
    }}
    style={styles.avatar}
  />
  <Text style={styles.name}>Madelyn Dias 🇮🇳</Text>
  <Text style={styles.subTitle}>Quiz Wizard of April</Text>
</View>


      {/* Green Stat Cards */}
      <View style={styles.statCardContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Points</Text>
          <Text style={styles.statValue}>890</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>World Rank</Text>
          <Text style={styles.statValue}>#1,458</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Local Rank</Text>
          <Text style={styles.statValue}>#56</Text>
        </View>
      </View>

      {/* Quiz Info */}
      <View style={styles.quizInfo}>
        <Text style={styles.quizText}>You have played a total</Text>
        <Text style={styles.quizHighlight}>24 quizzes this month!</Text>

        <View style={styles.circle}>
          <Text style={styles.circleText}>37/50</Text>
          <Text style={styles.circleSubText}>Quiz Played</Text>
        </View>

        <View style={styles.inlineStats}>
          <View style={styles.smallStat}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statTitle}>Quiz Created</Text>
          </View>
          <View style={styles.smallStat}>
            <Text style={styles.statValue}>21</Text>
            <Text style={styles.statTitle}>Quiz Won</Text>
          </View>
        </View>
      </View>

      {/* Performance Graph Bars (Enhanced View) */}
      <View style={styles.performanceContainer}>
        <Text style={styles.sectionTitle}>Top performance by category</Text>

        {/* Math */}
        <View style={styles.categoryRow}>
          <Text style={styles.categoryName}>Math</Text>
          <Text style={styles.categoryScore}>84%</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: "84%", backgroundColor: "#4CAF50" },
            ]}
          />
        </View>
        <Text style={styles.quizCount}>18 quizzes played</Text>

        {/* Sports */}
        <View style={styles.categoryRow}>
          <Text style={styles.categoryName}>Sports</Text>
          <Text style={styles.categoryScore}>63%</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: "63%", backgroundColor: "#2196F3" },
            ]}
          />
        </View>
        <Text style={styles.quizCount}>12 quizzes played</Text>

        {/* Music */}
        <View style={styles.categoryRow}>
          <Text style={styles.categoryName}>Music</Text>
          <Text style={styles.categoryScore}>92%</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: "92%", backgroundColor: "#FFC107" },
            ]}
          />
        </View>
        <Text style={styles.quizCount}>22 quizzes played</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F8FC",
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: "#4A90E2",
    alignItems: "center",
    marginTop: 20,
    paddingTop:10,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    fontSize: 14,
    color: "#E0F7FA",
    marginTop: 4,
  },
  
  statCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#D1FADF",
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  statTitle: {
    fontSize: 14,
    color: "#444",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
  },
  quizInfo: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  quizText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  quizHighlight: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 12,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 16,
  },
  circleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  circleSubText: {
    fontSize: 12,
    color: "#666",
  },
  inlineStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  smallStat: {
    alignItems: "center",
  },
  performanceContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  categoryScore: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressBarFill: {
    height: 10,
    borderRadius: 6,
  },
  quizCount: {
    fontSize: 12,
    color: "#666",
    marginBottom: 14,
  },
});

export default P5;
