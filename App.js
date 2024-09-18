import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, FlatList, Image, ActivityIndicator, Button } from 'react-native';
import { styles } from './src/styles/styles';

export default function App() {
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [inputValue, setInputValue] = useState('');

  const fetchUserData = async (userName) => {
    setLoading(true);
    try {
      const userResponse = await fetch(`https://api.github.com/users/${userName}`);
      const userData = await userResponse.json();

      if (userResponse.status === 404) {
        alert('Usuário não encontrado');
        setUser(null);
        setRepositories([]);
        setLoading(false);
        return;
      }

      const reposResponse = await fetch(userData.repos_url);
      const reposData = await reposResponse.json();

      setUser(userData);
      setRepositories(reposData);
    } catch (error) {
      alert('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      fetchUserData(inputValue);
    } else {
      // Se o input estiver vazio, resetar o estado
      setUser(null);
      setRepositories([]);
    }
  };

  const handleInputChange = (text) => {
    setInputValue(text);

    // Se o campo de entrada for limpo, resetar o estado
    if (text === '') {
      setUser(null);
      setRepositories([]);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Usuário do GitHub</Text>
      <StatusBar style="auto" />

      <TextInput
        style={styles.input}
        placeholder="Digite o nome do usuário"
        value={inputValue}
        onChangeText={handleInputChange}  // Usar handleInputChange para lidar com a mudança do texto
        onSubmitEditing={handleSearch}
      />
      <Button title="Buscar" onPress={handleSearch} />

      {user && (
        <View style={styles.userInfo}>
          <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
          <Text>Nome: {user.login}</Text>
          <Text>Seguidores: {user.followers}</Text>
          <Text>Seguindo: {user.following}</Text>
          {user.location && <Text>Localização: {user.location}</Text>}
        </View>
      )}

      <FlatList
        style={styles.list}
        data={repositories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemList}>
            <Text>Repositório: {item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
