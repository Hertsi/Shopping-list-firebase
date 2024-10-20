import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { getItems, addItem, deleteItem } from './firebase/firebaseService';
import Icon from 'react-native-vector-icons/Ionicons';

export default function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const itemsFromDb = await getItems();
      setItems(itemsFromDb);
    };
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (newItem.trim()) {
      await addItem(newItem.trim());
      setNewItem('');
      const itemsFromDb = await getItems();
      setItems(itemsFromDb);
    }
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    const itemsFromDb = await getItems();
    setItems(itemsFromDb);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add new item..."
        value={newItem}
        onChangeText={setNewItem}
      />
      <Button title="Add Item" onPress={handleAddItem} />

      <ScrollView>
        {items.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
              <Icon name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});