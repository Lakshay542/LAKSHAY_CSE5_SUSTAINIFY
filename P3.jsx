import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// Quiz Data (can be extended to 50-60 items later)
const quizTopics = [
  { id: 1, title: "Environment Basics", type: "MCQ" },
  { id: 2, title: "Sustainable Living", type: "True/False" },
  { id: 3, title: "Climate Change", type: "MCQ" },
  { id: 4, title: "Water Conservation", type: "Fill in the Blanks" },
  { id: 5, title: "Biodiversity", type: "MCQ" },
  { id: 6, title: "Recycling & Waste", type: "Match Pairs" },
  { id: 7, title: "Renewable Energy", type: "True/False" },
  { id: 8, title: "Eco-friendly Habits", type: "MCQ" },
  { id: 9, title: "Green Technology", type: "Fill in the Blanks" },
  { id: 10, title: "Wildlife Protection", type: "True/False" },
  { id: 11, title: "Air Pollution", type: "MCQ" },
  { id: 12, title: "Soil Erosion", type: "True/False" },
  { id: 13, title: "Carbon Footprint", type: "MCQ" },
  { id: 14, title: "Ocean Cleanup", type: "Fill in the Blanks" },
  { id: 15, title: "Afforestation", type: "Match Pairs" },
  { id: 16, title: "Green Building", type: "MCQ" },
  { id: 17, title: "Plastic Ban", type: "True/False" },
  { id: 18, title: "Energy Efficiency", type: "Fill in the Blanks" },
  { id: 19, title: "Composting", type: "MCQ" },
  { id: 20, title: "E-Waste Management", type: "Match Pairs" },
  { id: 21, title: "Organic Farming", type: "True/False" },
  { id: 22, title: "Rainwater Harvesting", type: "Fill in the Blanks" },
  { id: 23, title: "Greenhouse Effect", type: "MCQ" },
  { id: 24, title: "Deforestation", type: "True/False" },
  { id: 25, title: "Ozone Layer", type: "Fill in the Blanks" },
  { id: 26, title: "Carbon Trading", type: "MCQ" },
  { id: 27, title: "Urban Farming", type: "Match Pairs" },
  { id: 28, title: "Global Warming", type: "MCQ" },
  { id: 29, title: "Net Zero", type: "True/False" },
  { id: 30, title: "Sustainable Transport", type: "MCQ" },
  { id: 31, title: "Eco-labels", type: "Fill in the Blanks" },
  { id: 32, title: "Green Jobs", type: "True/False" },
  { id: 33, title: "Low Carbon Economy", type: "MCQ" },
  { id: 34, title: "Biodegradable Materials", type: "Match Pairs" },
  { id: 35, title: "Water Pollution", type: "MCQ" },
  { id: 36, title: "Sustainable Development Goals", type: "True/False" },
  { id: 37, title: "Carbon Neutrality", type: "Fill in the Blanks" },
  { id: 38, title: "Zero Waste", type: "MCQ" },
  { id: 39, title: "Nature Conservation", type: "True/False" },
  { id: 40, title: "Habitat Loss", type: "Fill in the Blanks" },
  { id: 41, title: "Climate Justice", type: "Match Pairs" },
  { id: 42, title: "Sustainable Fashion", type: "MCQ" },
  { id: 43, title: "Noise Pollution", type: "True/False" },
  { id: 44, title: "Renewable Transport", type: "Fill in the Blanks" },
  { id: 45, title: "Solar Energy", type: "MCQ" },
  { id: 46, title: "Wind Power", type: "True/False" },
  { id: 47, title: "Hydropower", type: "MCQ" },
  { id: 48, title: "Green Packaging", type: "Fill in the Blanks" },
  { id: 49, title: "Eco Schools", type: "True/False" },
  { id: 50, title: "Sustainable Cities", type: "Match Pairs" },
  { id: 51, title: "Climate Science", type: "MCQ" },
  { id: 52, title: "Environmental Policies", type: "Fill in the Blanks" },
  { id: 53, title: "Nature-based Solutions", type: "MCQ" },
  { id: 54, title: "Circular Economy", type: "Match Pairs" },
  { id: 55, title: "Green Startups", type: "True/False" },
];


const P3 = () => {
  const [search, setSearch] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const filtered = quizTopics.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  // If a quiz is selected, show the detail screen
  if (selectedQuiz) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setSelectedQuiz(null)} style={styles.backWrapper}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
    
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>{selectedQuiz.title}</Text>
          <Text style={styles.detailType}>📝 {selectedQuiz.type}</Text>
          <Text style={styles.detailDesc}>
            {selectedQuiz.description || "This quiz will test your knowledge and help raise awareness on this topic. Let's make learning fun!"}
          </Text>
    
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    
  }

  // Default screen
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🌿 Quiz Zone</Text>
      <Text style={styles.subHeader}>Search & explore quizzes on eco topics</Text>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder="Search quizzes..."
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
      </View>

      <Text style={styles.sectionTitle}>Popular Topics</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {filtered.slice(0, 5).map((quiz) => (
          <TouchableOpacity key={quiz.id} style={styles.horizontalCard} onPress={() => setSelectedQuiz(quiz)}>
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <Text style={styles.quizType}>{quiz.type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>More Quizzes</Text>
      <View style={styles.verticalGrid}>
        {filtered.slice(5).map((quiz, index) => (
          <TouchableOpacity
            key={quiz.id}
            style={[
              styles.verticalCard,
              index % 2 === 0 ? styles.cardTall : styles.cardWide,
            ]}
            onPress={() => setSelectedQuiz(quiz)}
          >
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <Text style={styles.quizType}>{quiz.type}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default P3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1fbf6",
    padding: 16,
    
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0a6847",
  },
  subHeader: {
    fontSize: 14,
    color: "#444",
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e2f0ea",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#14532d",
    marginBottom: 10,
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  horizontalCard: {
    backgroundColor: "#b4eadb",
    padding: 16,
    borderRadius: 14,
    marginRight: 12,
    width: 180,
    height: 120,
    justifyContent: "center",
    elevation: 2,
  },
  verticalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    paddingBottom:15
  },
  verticalCard: {
    backgroundColor: "#c2f2e1",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    justifyContent: "center",
    elevation: 3,
  },
  cardTall: {
    width: "100%",
    height: 120,
  },
  cardWide: {
    width: "48%",
    height: 100,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#064e3b",
    marginBottom: 6,
  },
  quizType: {
    fontSize: 12,
    color: "#064e3b",
  },
  // Detail Page
  backButton: {
    fontSize: 16,
    color: "#0a6847",
    marginBottom: 10,
  },
  detailContainer: {
    backgroundColor: "#e2f0ea",
    borderRadius: 16,
    padding: 20,
    elevation: 4,
  },
  detailCard: {
    backgroundColor: "#e0f7ec",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    marginTop: 20,
    marginHorizontal: 10,
  },
  
  backWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  
  backButton: {
    fontSize: 18,
    color: "#0a6847",
    fontWeight: "600",
  },
  
  detailTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#064e3b",
    marginBottom: 10,
  },
  
  detailType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1c4532",
    marginBottom: 16,
  },
  
  detailDesc: {
    fontSize: 15,
    color: "#2f3e34",
    lineHeight: 22,
    marginBottom: 24,
  },
  
  startButton: {
    backgroundColor: "#0a6847",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  
  startButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
});
