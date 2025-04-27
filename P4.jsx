import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const categories = {
  main: ['Transport', 'Electricity', 'Energy Consumption', 'Waste', 'Lifestyle'],
  Transport: ['Public', 'Private', 'Flights'],
  Public: ['Bus', 'Taxi', 'Auto', 'Train'],
  Private: ['Car', 'Two-Wheeler', 'Bicycle'],
  Bus: ['Diesel', 'CNG', 'Electric'],
  Taxi: ['Ola/Uber', 'Local Taxi'],
  'Ola/Uber': ['Petrol', 'Diesel', 'Electric'],
  'Local Taxi': ['Petrol', 'Diesel', 'CNG'],
  Auto: ['CNG', 'Petrol'],
  Train: ['Electric', 'Diesel'],
  Car: ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'],
  'Two-Wheeler': ['Petrol', 'Electric'],
  Bicycle: ['Manual', 'Electric'],
  Flights: ['Domestic', 'International'],
  Electricity: ['Home Usage', 'Solar', 'Generator'],
  'Home Usage': ['Appliance Type', 'Billing Info'],
  'Appliance Type': ['Lights', 'Air Conditioner', 'Heater', 'Refrigerator', 'Others'],
  'Billing Info': ['Units Consumed', 'Monthly Bill'],
  'Energy Consumption': ['Cooking', 'Heating'],
  Cooking: ['LPG', 'Electric', 'Wood'],
  Heating: ['Gas Heater', 'Electric Heater'],
  Waste: ['Organic', 'Plastic', 'Metal', 'Paper', 'E-Waste'],
  Lifestyle: ['Shopping', 'Food Habits', 'Travel Habits'],
  Shopping: ['Clothing', 'Electronics'],
  'Food Habits': ['Vegetarian', 'Non-Vegetarian', 'Vegan'],
  'Travel Habits': ['Flights per Year', 'Train/Bus Usage'],
};

const emissionFactors = {
  // Transport factors (kg CO2 per km)
  'Bus-Diesel': 0.089,
  'Bus-CNG': 0.078,
  'Bus-Electric': 0.025,
  'Taxi-Petrol': 0.192,
  'Taxi-Diesel': 0.171,
  'Taxi-CNG': 0.126,
  'Taxi-Electric': 0.045,
  'Auto-CNG': 0.072,
  'Auto-Petrol': 0.092,
  'Train-Electric': 0.035,
  'Train-Diesel': 0.061,
  'Car-Petrol': 0.192,
  'Car-Diesel': 0.171,
  'Car-CNG': 0.126,
  'Car-Electric': 0.045,
  'Car-Hybrid': 0.105,
  'Two-Wheeler-Petrol': 0.113,
  'Two-Wheeler-Electric': 0.022,
  'Bicycle-Manual': 0,
  'Bicycle-Electric': 0.005,
  'Flight-Domestic': 0.133, // per passenger km
  'Flight-International': 0.172, // per passenger km
  
  // Electricity factors (kg CO2 per kWh)
  'Grid-Electricity': 0.82, // average grid emission factor
  'Solar-Electricity': 0.05,
  'Generator-Electricity': 1.2,
  
  // Cooking factors (kg CO2 per kg or kWh)
  'Cooking-LPG': 2.98, // per kg
  'Cooking-Electric': 0.82, // per kWh
  'Cooking-Wood': 1.5, // per kg
  
  // Waste factors (kg CO2 per kg)
  'Waste-Organic': 0.5,
  'Waste-Plastic': 3.0,
  'Waste-Metal': 2.5,
  'Waste-Paper': 1.2,
  'Waste-E-Waste': 4.0,
  
  // Lifestyle factors
  'Clothing': 15, // kg CO2 per new clothing item
  'Electronics': 50, // kg CO2 per new electronic item
  'Diet-Vegetarian': 1.7, // kg CO2 per meal
  'Diet-NonVegetarian': 3.5,
  'Diet-Vegan': 1.2,
};

const icons = {
  Transport: 'train',
  Electricity: 'flash',
  'Energy Consumption': 'fire',
  Waste: 'trash-can',
  Lifestyle: 'human',
  Public: 'bus',
  Private: 'car',
  Flights: 'airplane',
  Bus: 'bus',
  Taxi: 'taxi',
  Auto: 'rickshaw',
  Train: 'train',
  Car: 'car',
  'Two-Wheeler': 'bike',
  Bicycle: 'bicycle',
  'Home Usage': 'home',
  Solar: 'solar-power',
  Generator: 'engine',
  'Appliance Type': 'lightbulb',
  'Billing Info': 'cash',
  Cooking: 'stove',
  Heating: 'weather-sunny',
  Organic: 'leaf',
  Plastic: 'bottle-soda',
  Metal: 'weight',
  Paper: 'file',
  'E-Waste': 'monitor',
  Shopping: 'shopping',
  'Food Habits': 'food',
  'Travel Habits': 'map-marker',
};

const screenWidth = Dimensions.get('window').width;

const CarbonFootprintCalculator = () => {
  const [path, setPath] = useState(['main']);
  const [selections, setSelections] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [distance, setDistance] = useState('');
  const [units, setUnits] = useState('');
  const [billAmount, setBillAmount] = useState('');

  const currentCategory = path[path.length - 1];
  const options = categories[currentCategory] || [];

  const goBack = () => {
    if (path.length > 1) {
      setPath((prev) => prev.slice(0, -1));
    }
  };

  const handleInputChange = (key, value) => {
    setInputValues(prev => ({ ...prev, [key]: value }));
  };

  const handleClick = (option) => {
    if (categories[option]) {
      setPath((prev) => [...prev, option]);
    } else {
      // For final selections that need input
      setPath((prev) => [...prev, option]);
    }
  };

  const calculateEmission = () => {
    let newSelections = [...selections];
    
    // Transport calculations
    if (path.includes('Transport')) {
      const transportType = path[2]; // Public or Private or Flights
      const vehicleType = path[3]; // Bus, Car, etc.
      const fuelType = path[4]; // Petrol, Diesel, etc.
      
      if (distance && transportType && vehicleType && fuelType) {
        const key = `${vehicleType}-${fuelType}`;
        const factor = emissionFactors[key] || 0;
        const emission = parseFloat(distance) * factor;
        
        newSelections.push({
          category: 'Transport',
          type: `${vehicleType} (${fuelType})`,
          value: parseFloat(distance),
          unit: 'km',
          emission: emission,
          date: new Date().toISOString().split('T')[0]
        });
      }
    }
    
    // Electricity calculations
    else if (path.includes('Electricity')) {
      const source = path[2]; // Home Usage, Solar, Generator
      
      if (source === 'Home Usage') {
        if (units) {
          const emission = parseFloat(units) * emissionFactors['Grid-Electricity'];
          newSelections.push({
            category: 'Electricity',
            type: 'Grid Electricity',
            value: parseFloat(units),
            unit: 'kWh',
            emission: emission,
            date: new Date().toISOString().split('T')[0]
          });
        } else if (billAmount) {
          // Estimate units from bill (assuming $0.15 per kWh)
          const estimatedUnits = parseFloat(billAmount) / 0.15;
          const emission = estimatedUnits * emissionFactors['Grid-Electricity'];
          newSelections.push({
            category: 'Electricity',
            type: 'Grid Electricity (estimated)',
            value: estimatedUnits,
            unit: 'kWh',
            emission: emission,
            date: new Date().toISOString().split('T')[0]
          });
        }
      } else if (source === 'Solar' || source === 'Generator') {
        if (units) {
          const key = `${source}-Electricity`;
          const emission = parseFloat(units) * (emissionFactors[key] || 0);
          newSelections.push({
            category: 'Electricity',
            type: source,
            value: parseFloat(units),
            unit: 'kWh',
            emission: emission,
            date: new Date().toISOString().split('T')[0]
          });
        }
      }
    }
    
    // Waste calculations
    else if (path.includes('Waste')) {
      const wasteType = path[2]; // Organic, Plastic, etc.
      const amount = inputValues[`waste-${wasteType}`];
      
      if (amount) {
        const key = `Waste-${wasteType}`;
        const emission = parseFloat(amount) * (emissionFactors[key] || 0);
        newSelections.push({
          category: 'Waste',
          type: wasteType,
          value: parseFloat(amount),
          unit: 'kg',
          emission: emission,
          date: new Date().toISOString().split('T')[0]
        });
      }
    }
    
    // Lifestyle calculations
    else if (path.includes('Lifestyle')) {
      const category = path[2]; // Shopping, Food Habits, etc.
      
      if (category === 'Shopping') {
        const itemType = path[3]; // Clothing, Electronics
        const quantity = inputValues[`shopping-${itemType}`];
        
        if (quantity) {
          const emission = parseFloat(quantity) * (emissionFactors[itemType] || 0);
          newSelections.push({
            category: 'Shopping',
            type: itemType,
            value: parseFloat(quantity),
            unit: 'items',
            emission: emission,
            date: new Date().toISOString().split('T')[0]
          });
        }
      } else if (category === 'Food Habits') {
        const dietType = path[3]; // Vegetarian, etc.
        const meals = inputValues['meals-per-day'];
        
        if (meals) {
          const key = `Diet-${dietType}`;
          const dailyEmission = parseFloat(meals) * (emissionFactors[key] || 0);
          newSelections.push({
            category: 'Food',
            type: dietType,
            value: parseFloat(meals),
            unit: 'meals/day',
            emission: dailyEmission,
            date: new Date().toISOString().split('T')[0]
          });
        }
      }
    }
    
    setSelections(newSelections);
    setDistance('');
    setUnits('');
    setBillAmount('');
    setInputValues({});
    setPath(['main']);
  };

  const predictFootprint = (period = 'yearly') => {
    const daily = selections.reduce((sum, item) => sum + (item.emission || 0), 0);
    
    switch (period) {
      case 'daily':
        return daily.toFixed(2);
      case 'weekly':
        return (daily * 7).toFixed(2);
      case 'monthly':
        return (daily * 30).toFixed(2);
      case 'yearly':
        return (daily * 365).toFixed(2);
      default:
        return daily.toFixed(2);
    }
  };

  const getCategoryData = () => {
    const categories = {};
    
    selections.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = 0;
      }
      categories[item.category] += item.emission;
    });
    
    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
      color: getRandomColor(),
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    }));
  };

  const getDailyData = () => {
    const days = {};
    const now = new Date();
    
    // Group by day for last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      days[dateStr] = 0;
    }
    
    selections.forEach(item => {
      if (days[item.date]) {
        days[item.date] += item.emission;
      }
    });
    
    return {
      labels: Object.keys(days).map(d => d.split('-')[2]), // Just day number
      datasets: [{
        data: Object.values(days),
        color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
        strokeWidth: 2
      }]
    };
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderInputField = () => {
    if (path.includes('Transport') && path.length === 5) {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Distance Traveled (km)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={distance}
            onChangeText={setDistance}
            placeholder="Enter distance"
          />
          <TouchableOpacity style={styles.saveButton} onPress={calculateEmission}>
            <Text style={styles.saveButtonText}>Calculate Emission</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (path.includes('Electricity')) {
      if (path[path.length - 1] === 'Units Consumed') {
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Units Consumed (kWh)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={units}
              onChangeText={setUnits}
              placeholder="Enter units"
            />
            <TouchableOpacity style={styles.saveButton} onPress={calculateEmission}>
              <Text style={styles.saveButtonText}>Calculate Emission</Text>
            </TouchableOpacity>
          </View>
        );
      } else if (path[path.length - 1] === 'Monthly Bill') {
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Monthly Bill Amount ($)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={billAmount}
              onChangeText={setBillAmount}
              placeholder="Enter bill amount"
            />
            <TouchableOpacity style={styles.saveButton} onPress={calculateEmission}>
              <Text style={styles.saveButtonText}>Calculate Emission</Text>
            </TouchableOpacity>
          </View>
        );
      }
    } else if (path.includes('Waste') && path.length === 3) {
      const wasteType = path[2];
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{wasteType} Waste (kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={inputValues[`waste-${wasteType}`] || ''}
            onChangeText={(text) => handleInputChange(`waste-${wasteType}`, text)}
            placeholder={`Enter ${wasteType} waste amount`}
          />
          <TouchableOpacity style={styles.saveButton} onPress={calculateEmission}>
            <Text style={styles.saveButtonText}>Calculate Emission</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (path.includes('Lifestyle')) {
      if (path[2] === 'Shopping' && path.length === 4) {
        const itemType = path[3];
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Number of {itemType} Items</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={inputValues[`shopping-${itemType}`] || ''}
              onChangeText={(text) => handleInputChange(`shopping-${itemType}`, text)}
              placeholder={`Enter ${itemType} items count`}
            />
            <TouchableOpacity style={styles.saveButton} onPress={calculateEmission}>
              <Text style={styles.saveButtonText}>Calculate Emission</Text>
            </TouchableOpacity>
          </View>
        );
      } else if (path[2] === 'Food Habits' && path.length === 4) {
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Meals Per Day</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={inputValues['meals-per-day'] || ''}
              onChangeText={(text) => handleInputChange('meals-per-day', text)}
              placeholder="Enter meals per day"
            />
            <TouchableOpacity style={styles.saveButton} onPress={calculateEmission}>
              <Text style={styles.saveButtonText}>Calculate Emission</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
    
    return null;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {path.length > 1 && (
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Icon name="arrow-left" size={20} color="#000" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>
          {currentCategory === 'main' ? 'Carbon Footprint Calculator' : currentCategory}
        </Text>
      </View>

      {!showReport ? (
        <View>
          {renderInputField()}
          
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleClick(option)}
              style={styles.optionCard}
            >
              <Icon
                name={icons[option] || 'pine-tree'}
                size={24}
                color="green"
                style={styles.optionIcon}
              />
              <View>
                <Text style={styles.optionText}>{option}</Text>
                {emissionFactors[option] && (
                  <Text style={styles.optionSubText}>
                    Emission Factor: {emissionFactors[option]} kg CO₂
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}

          {selections.length > 0 && (
            <TouchableOpacity style={styles.reportButton} onPress={() => setShowReport(true)}>
              <Icon name="chart-bar" size={20} color="white" />
              <Text style={styles.reportText}>View Report</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.reportContainer}>
          <Text style={styles.reportTitle}>Carbon Footprint Report</Text>
          
          {/* Summary Cards */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Daily</Text>
              <Text style={styles.summaryValue}>{predictFootprint('daily')} kg</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Weekly</Text>
              <Text style={styles.summaryValue}>{predictFootprint('weekly')} kg</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Monthly</Text>
              <Text style={styles.summaryValue}>{predictFootprint('monthly')} kg</Text>
            </View>
          </View>
          
          {/* Category Breakdown Pie Chart */}
          <Text style={styles.chartTitle}>Emission by Category</Text>
          <PieChart
            data={getCategoryData()}
            width={screenWidth - 40}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            style={styles.chart}
          />
          
          {/* Daily Trend Line Chart */}
          <Text style={styles.chartTitle}>Daily Emission Trend</Text>
          <LineChart
            data={getDailyData()}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726'
              }
            }}
            bezier
            style={styles.chart}
          />
          
          {/* Detailed Breakdown */}
          <Text style={styles.chartTitle}>Detailed Breakdown</Text>
          <View style={styles.detailedList}>
            {selections.map((item, index) => (
              <View key={index} style={styles.detailItem}>
                <Text style={styles.detailCategory}>{item.category}</Text>
                <Text style={styles.detailType}>{item.type}</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailValue}>{item.value} {item.unit}</Text>
                  <Text style={styles.detailEmission}>{item.emission.toFixed(2)} kg CO₂</Text>
                </View>
              </View>
            ))}
          </View>
          
          {/* Future Projection */}
          <Text style={styles.chartTitle}>Future Projection</Text>
          <Text style={styles.projectionText}>
            At this rate, your estimated yearly footprint will be{' '}
            <Text style={styles.bold}>{predictFootprint('yearly')} kg CO₂</Text>.
          </Text>
          <Text style={styles.projectionText}>
            That's equivalent to {Math.round(predictFootprint('yearly') / 2000)} flights from New York to London!
          </Text>
          
          <TouchableOpacity style={styles.backToCalc} onPress={() => setShowReport(false)}>
            <Icon name="arrow-left" size={20} color="#000" />
            <Text style={styles.backText}>Back to Calculator</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 6,
    fontSize: 14,
  },
  optionCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionSubText: {
    fontSize: 12,
    color: '#555',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  reportButton: {
    flexDirection: 'row',
    backgroundColor: '#22c55e',
    padding: 14,
    marginTop: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  reportContainer: {
    marginTop: 20,
  },
  reportTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  chart: {
    borderRadius: 10,
    marginBottom: 10,
  },
  detailedList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  detailItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailCategory: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  detailType: {
    fontSize: 12,
    color: '#555',
    marginVertical: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  detailValue: {
    fontSize: 12,
    color: '#777',
  },
  detailEmission: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  projectionText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  backToCalc: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CarbonFootprintCalculator;