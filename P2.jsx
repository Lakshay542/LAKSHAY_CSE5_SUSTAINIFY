import React from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
const blogData = [
    {
      id: 1,
      title: "Top Renewable Energy Sources in 2025",
      description: "Explore how solar, wind, and hydro are transforming global energy.",
      image: "https://th.bing.com/th/id/OBTQ.BT4EB6F867C06F33E5608F0CF2369222A024FC55BC35149EB9605683FF29AEF6E6?w=120&h=120&c=1&rs=1&qlt=80&o=6&dpr=1.3&pid=SANGAM",
    },
    {
      id: 2,
      title: "Simple Ways to Live Sustainably",
      description: "Everyday habits that help reduce your ecological footprint.",
      image: "https://i.ibb.co/zJpFzF5/eco-blog.jpg",
    },
    {
      id: 3,
      title: "Zero Waste Lifestyle Guide",
      description: "Learn how to cut down on trash and embrace reusable living.",
      image: "https://i.ibb.co/YpGxN2d/zero-waste.jpg",
    },
    {
      id: 4,
      title: "Urban Gardening for Beginners",
      description: "Start growing your own food—even in small city spaces.",
      image: "https://i.ibb.co/nbKVf7Z/urban-garden.jpg",
    },
    {
      id: 5,
      title: "How to Reduce Plastic Use",
      description: "Practical alternatives to plastic for everyday needs.",
      image: "https://i.ibb.co/sPCgWn5/plastic-free.jpg",
    },
    {
      id: 6,
      title: "Importance of Forest Conservation",
      description: "Why preserving forests is vital for climate balance.",
      image: "https://i.ibb.co/sWWyBhD/forest.jpg",
    },
    {
      id: 7,
      title: "Green Buildings: The Future of Architecture",
      description: "Eco-friendly building techniques that save energy.",
      image: "https://i.ibb.co/9g5skzd/green-building.jpg",
    },
    {
      id: 8,
      title: "Rainwater Harvesting Basics",
      description: "How to collect and reuse rainwater sustainably.",
      image: "https://i.ibb.co/FxJb8Tv/rainwater.jpg",
    },
    {
      id: 9,
      title: "Composting at Home",
      description: "Turn your kitchen waste into nutrient-rich compost.",
      image: "https://i.ibb.co/hfZbdFf/compost.jpg",
    },
    {
      id: 10,
      title: "The Role of Wetlands in Ecology",
      description: "Discover how wetlands support biodiversity and water purification.",
      image: "https://i.ibb.co/fHjfNvg/wetlands.jpg",
    },
    {
      id: 11,
      title: "Solar Panels: A Beginner's Guide",
      description: "All you need to know about installing solar energy at home.",
      image: "https://i.ibb.co/GTrRf9s/solar.jpg",
    },
    {
      id: 12,
      title: "Sustainable Fashion Tips",
      description: "Dress smart with eco-conscious brands and choices.",
      image: "https://i.ibb.co/gWr1bDx/sustainable-fashion.jpg",
    },
    {
      id: 13,
      title: "The Impact of Fast Food on the Planet",
      description: "How food production and waste affect global warming.",
      image: "https://i.ibb.co/ZNDKvkb/fast-food.jpg",
    },
    {
      id: 14,
      title: "Protecting Endangered Species",
      description: "Steps we can take to preserve animal biodiversity.",
      image: "https://i.ibb.co/ChJkD44/endangered.jpg",
    },
    {
      id: 15,
      title: "Benefits of Using Bicycles",
      description: "Eco-friendly travel that improves your health and saves the planet.",
      image: "https://i.ibb.co/h8jSnmF/cycling.jpg",
    },
    {
      id: 16,
      title: "Why Bees Matter",
      description: "Understand the critical role of pollinators in agriculture.",
      image: "https://i.ibb.co/qjRjD8P/bees.jpg",
    },
    {
      id: 17,
      title: "Eco-friendly Cleaning Products",
      description: "Ditch harmful chemicals for greener cleaning.",
      image: "https://i.ibb.co/6JzF8Cn/cleaning.jpg",
    },
    {
      id: 18,
      title: "The Power of Community Cleanups",
      description: "How local efforts create big environmental impact.",
      image: "https://i.ibb.co/J2Z1Vr1/cleanup.jpg",
    },
    {
      id: 19,
      title: "The Circular Economy Explained",
      description: "How reusing and recycling fuel sustainable growth.",
      image: "https://i.ibb.co/B4Y9V8j/circular-economy.jpg",
    },
    {
      id: 20,
      title: "Eco-tourism: Travel with a Purpose",
      description: "Sustainable travel options that benefit nature and communities.",
      image: "https://i.ibb.co/ZLM9xch/ecotourism.jpg",
    },
  ];
  

const P2 = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Latest Blogs</Text>
      {blogData.map((blog) => (
        <View key={blog.id} style={styles.card}>
          <Image source={{ uri: blog.image }} style={styles.image} />
          <Text style={styles.title}>{blog.title}</Text>
          <Text style={styles.description}>{blog.description}</Text>
          <TouchableOpacity>
            <Text style={styles.readMore}>Read More →</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F2F4F6",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 180,
    width: "100%",
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#1E293B",
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 10,
  },
  readMore: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2563EB",
  },
});

export default P2;
