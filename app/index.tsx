/*
import { Text, View, Image, StyleSheet, Pressable } from 'react-native'
import { colors } from '../constants/colors'
import { Link } from 'expo-router'


export default function Index() {
  return (
    <View>
      <Image
      source={require('../assets/images/logo.png')}
      />
       
       <Text>
           Mapa de Produção
       </Text>
      
       <Text>
           A COOPERATIVA DE PEQUENOS PRODUTORES RURAIS DE ASSUNÇÃO DO PIAUÍ – COOPPRAS
       </Text>

      <Pressable>
        <Text> Formulário</Text>    
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.background,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  title:{
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.green
  },
  text:{
    fontSize: 16, 
    color: colors.white,
    width: 240,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  button:{
    backgroundColor: colors.blue,
    width: '100%',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34,
  },
  buttonText:{
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

*/

import { Text, View, Image, StyleSheet, Pressable, } from 'react-native'
import { colors } from '../constants/colors'
import { Link } from 'expo-router'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo} // Aplica o estilo personalizado
        source={require('../assets/images/logo.png')}
      />

      <Text style={styles.title}>
      MAPA DE PRODUÇÃO AGROPECUÁRIA
      </Text>

      <Text style={styles.text}>
        A COOPERATIVA DE PEQUENOS PRODUTORES RURAIS DE ASSUNÇÃO DO PIAUÍ – COOPPRAS
      </Text>

      <Link href="/step" asChild
         style={styles.button}>
        <Text style={styles.buttonText}>Preencher_Formulário</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  logo: {
    width: 380,
    height: 160,
    resizeMode: 'contain', // Ajusta a imagem para não distorcer
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.green,
  },
  text: {
   // fontSize: 14,
    color: colors.black,
    width: 550,
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 4,
    fontSize: RFPercentage(2),
    
  },

  button: {
    backgroundColor: colors.blue,
    width: 365, // Define uma largura fixa, como 200 pixels
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 110,
    paddingHorizontal: 60, // Adiciona um pouco de padding horizontal
  },
  buttonText: {
    color: colors.white,
    fontSize: 24, // Ajuste o tamanho da fonte, se necessário
    lineHeight: 45, // Ajuste este valor para centralizar melhor o texto
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

