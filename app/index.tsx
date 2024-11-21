
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Alert } from 'react-native'
import { colors } from '../app/constants/colors'
import { Header } from '../components/header'
import React, { useState } from 'react';
import CheckBox from 'expo-checkbox';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import * as MediaLibrary from 'expo-media-library';
import { PermissionsAndroid, Platform } from 'react-native';
import { Switch } from 'react-native';



interface NaturezaOcupacao {
  propriedade: boolean;
  posse: boolean;
  contratoParceria: boolean;
  Arrendamento: boolean;
  Assentado: boolean;
  Quilombo: boolean;
  usoColetivo: boolean;
  Outros: boolean;
}

interface Represa {
  existe: boolean;
  tipo: string;
  area: string;
}

interface FonteEnergia {
  tipo: string;
  voltagem: string;
}

interface PastagemCultivada {
  tipo: string;
  area: string;
}

interface Cercado {
  area: string;
  finalidade: string;
}

interface FormData {
  nome: string;
  cpf: string;
  contato: string;
  nomeImovel: string;
  areaTotal: string;
  regiaoRota: string;
  distanciaSede: string;
  coordenadas: string;
  naturezaOcupacao: NaturezaOcupacao;
  dadosRegistro: string;
  cidade: string;
  uf: string;
  ccirIncra: string;
  nirf: string;
  car: boolean;
  areaReservaLegal: string;
  areaTotalConsolidada: string;
  areaReservaLegalProposta: string;
  areaReconhecidaApp: string;
  areaLitigio: string;
  fonteAguaPotavel: string;
  rioOuRiacho: boolean;
  represa: Represa;
  fonteEnergia: FonteEnergia;
  pastagemNativa: string;
  pastagemCultivada: PastagemCultivada;
  cercado1: Cercado;
  cercado2: Cercado;
  outrasAreas: string;
  outrasAreasEspecificas: { tamanho: string };
  numeroFamiliasTrabalhando: string;
  numeroFamiliasHabitando: string;
  proprietario: string;
  localizacao: string;
  areaPreservacaoPermanente: string;
  areaConsolidada: string;
  
}

// Tipo inicial
interface FormState {
  [key: string]: { [key: string]: any };
}



const [formData, setFormData] = useState<FormData>({
  nome: '',
  cpf: '',
  contato: '',
  nomeImovel: '',
  areaTotal: '',
  regiaoRota: '',
  distanciaSede: '',
  coordenadas: '',
  naturezaOcupacao: {
    propriedade: false,
    posse: false,
    contratoParceria: false,
    Arrendamento: false,
    Assentado: false,
    Quilombo: false,
    usoColetivo: false,
    Outros: false,
  },

  localizacao: '', // Inicializado
  areaReservaLegal: '',
  areaPreservacaoPermanente: '',
  areaConsolidada: '',
  dadosRegistro: '',
  ccirIncra: '',
  nirf: '',
  car: false,
  areaTotalConsolidada: '',
  areaReservaLegalProposta: '',
  areaReconhecidaApp: '',
  areaLitigio: '',
  fonteAguaPotavel: '',
  rioOuRiacho: false,
  represa: {
    existe: false,
    tipo: '',
    area: '',
  },
  fonteEnergia: {
    tipo: '',
    voltagem: '',
  },
  pastagemNativa: '',
  pastagemCultivada: {
    tipo: '',
    area: '',
  },
  cercado1: {
    area: '',
    finalidade: '',
  },
  cercado2: {
    area: '',
    finalidade: '',
  },
  outrasAreas: '',
  outrasAreasEspecificas: { tamanho: '' },
  numeroFamiliasHabitando: '',
  numeroFamiliasTrabalhando: '',
  proprietario: '',
  cidade: '', // 
  uf: '', // 
});

  

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    if (field in formData.naturezaOcupacao) {
      // Se o campo pertence a naturezaOcupacao
      setFormData((prevData) => ({
        ...prevData,
        naturezaOcupacao: {
          ...prevData.naturezaOcupacao,
          [field]: value as boolean,
        },
      }));
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

/*
const handleChange = (field: keyof typeof formData, value: string | boolean) => {
  setFormData({ ...formData, [field]: value });
};

*/

  const handleCheckboxChange = (field: keyof typeof formData.naturezaOcupacao) => {
    setFormData((prevData) => ({
      ...prevData,
      naturezaOcupacao: {
        ...prevData.naturezaOcupacao,
        [field]: !prevData.naturezaOcupacao[field],
      },
    }));
  };


  
// Função corrigida

  
  const capitalize = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  


  const requestPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'É necessário permitir acesso ao armazenamento para gerar e compartilhar o PDF.'
      );
      return false;
    }
    return true;
  };
  
  
  const generatePDF = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;
  

    const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; color: #333; }
          h2 { color: #555; margin-top: 20px; }
          p { font-size: 14px; color: #333; margin: 4px 0; }
          .section { margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h1>Dados do Cooperado e Propriedade Rural</h1>
        <div class="section">
          <h2>01 - Dados do Cooperado</h2>
          <p><strong>Nome:</strong> ${formData.nome}</p>
          <p><strong>CPF:</strong> ${formData.cpf}</p>
          <p><strong>Contato:</strong> ${formData.contato}</p>
        </div>

        <div class="section">
          <h2>Informações do Imóvel</h2>
          <p><strong>Nome do Imóvel:</strong> ${formData.nomeImovel}</p>
          <p><strong>Área Total:</strong> ${formData.areaTotal}</p>
          <p><strong>Região/Rota:</strong> ${formData.regiaoRota}</p>
          <p><strong>Distância / Sede / Km:</strong> ${formData.distanciaSede}</p>
          <p><strong>Coordenadas Geográficas:</strong> ${formData.coordenadas}</p>
          <p><strong>Localização (Município/UF):</strong> ${formData.localizacao}</p>
        </div>

        <div class="section">
  <h2>02 Natureza da Ocupação</h2>
  ${Object.entries(formData.naturezaOcupacao).map(
    ([key, value]) => `
      <p><strong>${capitalize(key)}:</strong> ${value ? 'Sim' : 'Não'}</p>`
  ).join('')}
</div>

        <div class="section">
  <h2>Áreas do Imóvel</h2>
  <p><strong>Área de Reserva Legal (ha):</strong> ${formData.areaReservaLegal}</p>
  <p><strong>Área de Preservação Permanente (APP) (ha):</strong> ${formData.areaPreservacaoPermanente}</p>
  <p><strong>Área Consolidada (ha):</strong> ${formData.areaConsolidada}</p>
  <p><strong>Área Total Consolidada (ha):</strong> ${formData.areaTotalConsolidada}</p>
  <p><strong>Área de Reserva Legal Proposta (ha):</strong> ${formData.areaReservaLegalProposta}</p>
  <p><strong>Área Reconhecida como APP (ha):</strong> ${formData.areaReconhecidaApp}</p>
  <p><strong>Área de Litígio (ha):</strong> ${formData.areaLitigio}</p>
</div>
<div class="section">
  <h2> Recursos e Infraestrutura</h2>
  <p><strong>Fonte de Água Potável:</strong> ${formData.fonteAguaPotavel}</p>
  <p><strong>Rio ou Riacho:</strong> ${formData.rioOuRiacho ? 'Sim' : 'Não'}</p>
  <p><strong>Existe Represa / Açude:</strong> ${formData.represa.tipo || 'Não informado'}</p>
  <p><strong>Área da Represa / Açude:</strong> ${formData.represa.area || 'Não informado'}</p>
  <p><strong>Fonte de Energia:</strong> ${formData.fonteEnergia.tipo || 'Não informado'}</p>
  <p><strong>Voltagem:</strong> ${formData.fonteEnergia.voltagem || 'Não informado'}</p>
</div>
<div class="section">
  <h2>Pastagens e Cercados</h2>
  <p><strong>Pastagem Nativa Predominante:</strong> ${formData.pastagemNativa}</p>
  <p><strong>Pastagem Cultivada:</strong> ${formData.pastagemCultivada.tipo || 'Não informado'}</p>
  <p><strong>Área da Pastagem Cultivada:</strong> ${formData.pastagemCultivada.area || 'Não informado'}</p>
  <p><strong>Cercado 1 - Área:</strong> ${formData.cercado1.area || 'Não informado'}</p>
  <p><strong>Cercado 1 - Finalidade:</strong> ${formData.cercado1.finalidade || 'Não informado'}</p>
  <p><strong>Cercado 2 - Área:</strong> ${formData.cercado2.area || 'Não informado'}</p>
  <p><strong>Cercado 2 - Finalidade:</strong> ${formData.cercado2.finalidade || 'Não informado'}</p>
  <p><strong>Outras Áreas Específicas - Tamanho:</strong> ${formData.outrasAreasEspecificas.tamanho || 'Não informado'}</p>
</div>
<div class="section">
  <h2>Famílias e Propriedade</h2>
  <p><strong>Número de Famílias Trabalhando no Imóvel:</strong> ${formData.numeroFamiliasTrabalhando}</p>
  <p><strong>Número de Famílias Habitando no Imóvel:</strong> ${formData.numeroFamiliasHabitando}</p>
  <p><strong>Proprietário do Imóvel:</strong> ${formData.proprietario}</p>
  <p><strong>CPF:</strong> ${formData.cpf}</p>
  <p><strong>Contato:</strong> ${formData.contato}</p>
</div>
<div class="section">
  <h2>Documentação</h2>
  <p><strong>Dados do Registro / Cidade / UF:</strong> ${formData.dadosRegistro}</p>
  <p><strong>CCIR / INCRA N°:</strong> ${formData.ccirIncra}</p>
  <p><strong>NIRF N°:</strong> ${formData.nirf}</p>
  <p><strong>Cadastro Ambiental Rural - CAR:</strong> ${formData.car ? 'Sim' : 'Não'}</p>
</div>
</body>
</html>
`;

const generatePDF = async () => {
  const options = {
    html: htmlContent,
    base64: false,
  };

  try {
    const pdf = await Print.printToFileAsync(options);
    await Sharing.shareAsync(pdf.uri);
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível gerar o PDF');
  }
};


const handleNestedChange = (parentkey: keyof FormData, childKey: string, value: string) => {
  // ... 
};
 


  return (
    <View style={styles.container}>
      <Header step="Voltar" title="DADOS DO COOPERADO E DA PROPRIEDADE RURAL" />
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Dados do Cooperado */}
 <Text style={styles.sectionTitle}>01 - DADOS DO COOPERADO</Text>
<Text style={styles.label}>Nome:</Text><TextInput style={styles.input}
 placeholder="Nome" value={formData.nome} onChangeText={(value) => handleChange('nome', value)} />

<Text style={styles.label}>CPF:</Text><TextInput style={styles.input} 
placeholder="CPF" value={formData.cpf} maxLength={14} onChangeText={(value) => handleChange('cpf', value)} />

<Text style={styles.label}>Contato:</Text><TextInput style={styles.input}
 placeholder="(##) #####-####" value={formData.contato} maxLength={15} onChangeText={(value) => handleChange('contato', value)} />

<Text style={styles.sectionTitle}>02 - Informações do Imóvel</Text>
<Text style={styles.label}>Nome do imóvel:</Text><TextInput style={styles.input} 
placeholder="Nome do Imóvel" value={formData.nomeImovel} onChangeText={(value) => handleChange('nomeImovel', value)} />

<Text style={styles.label}>Área total:</Text><TextInput style={styles.input}
 placeholder="Área total" value={formData.areaTotal} onChangeText={(value) => handleChange('areaTotal', value)} />

<Text style={styles.label}>Região/Rota:</Text><TextInput style={styles.input} 
placeholder="Região/Rota" value={formData.regiaoRota} onChangeText={(value) => handleChange('regiaoRota', value)} />

<Text style={styles.label}>Distância / Sede / Km:</Text><TextInput style={styles.input} 
placeholder="Distância / Sede / Km" value={formData.distanciaSede} onChangeText={(value) => handleChange('distanciaSede', value)} />

<Text style={styles.label}>Coordenadas Geográficas:</Text><TextInput style={styles.input}
 placeholder="Coordenadas Geográficas" value={formData.coordenadas} onChangeText={(value) => handleChange('coordenadas', value)} />

<Text style={styles.label}>Localização (Município/UF):</Text><TextInput style={styles.input} 
placeholder="Localização" value={formData.localizacao} onChangeText={(value) => handleChange('localizacao', value)} />


        {/* Natureza da Ocupação */}
        <Text style={styles.sectionTitle}>Natureza da Ocupação</Text>
        <View style={styles.checkboxGroup}> {Object.entries(formData.naturezaOcupacao).map(([key, value]) => (
            <View key={key} style={styles.checkboxContainer}>
              <CheckBox
                value={value} onValueChange={() => handleCheckboxChange(key as keyof NaturezaOcupacao)}
              />
              <Text style={styles.checkboxLabel}>{capitalize(key)}</Text>
            </View>
          ))}
        </View>

        {/* Áreas do Imóvel */}
        <Text style={styles.sectionTitle}>Dados de Registro</Text>

        <Text style={styles.label}>Cidade:</Text>
        <TextInput style={styles.input} placeholder="Cidade" onChangeText={(value) => handleChange('cidade', value)} />

        <Text style={styles.label}>UF:</Text>
        <TextInput style={styles.input} placeholder="UF" onChangeText={(value) => handleChange('uf', value)} />

        <Text style={styles.label}>CCIR / INCRA Nº:</Text>
        <TextInput style={styles.input} placeholder="CCIR / INCRA Nº" onChangeText={(value) => handleChange('ccirIncra', value)} />

        <Text style={styles.label}>NIRF Nº:</Text>
        <TextInput style={styles.input} placeholder="NIRF Nº" onChangeText={(value) => handleChange('nirf', value)} />

        <Text style={styles.label}>Cadastro Ambiental Rural - CAR:</Text>
        <CheckBox value={formData.car} onValueChange={(value) => handleChange('car', value)} />
        <Text>{formData.car ? 'Sim' : 'Não'}</Text>

<Text style={styles.label}>Área total consolidada/ha:</Text><TextInput style={styles.input} 
placeholder="Área total consolidada" value={formData.areaTotalConsolidada} onChangeText={(value) => handleChange('areaTotalConsolidada', value)} />

<Text style={styles.label}>Área de reserva legal proposta:</Text><TextInput style={styles.input} 
placeholder="Área de reserva legal proposta" value={formData.areaReservaLegalProposta} onChangeText={(value) => handleChange('areaReservaLegalProposta', value)} />

<Text style={styles.label}>Área reconhecida com APP/ha:</Text><TextInput style={styles.input}
 placeholder="Área reconhecida com APP" value={formData.areaReconhecidaApp} onChangeText={(value) => handleChange('areaReconhecidaApp', value)} />

<Text style={styles.label}>Área de litígio/ha:</Text><TextInput style={styles.input} 
placeholder="Área de litígio" value={formData.areaLitigio} onChangeText={(value) => handleChange('areaLitigio', value)} />

<Text style={styles.label}>Fonte de água potável:</Text><TextInput style={styles.input}
 placeholder="Fonte de água potável" value={formData.fonteAguaPotavel} onChangeText={(value) => handleChange('fonteAguaPotavel', value)} />

<Text style={styles.label}>Rio ou Riacho?</Text><Switch value={formData.rioOuRiacho}
 onValueChange={(value) => handleChange('rioOuRiacho', value)} />

<Text style={styles.label}>Existe represa / açude / tipo / área:</Text><TextInput style={styles.input} 
placeholder="Tipo" value={formData.represa.tipo} onChangeText={(value) => handleNestedChange('represa', 'tipo', value)} /><TextInput style={styles.input} 
placeholder="Área" value={formData.represa.area} onChangeText={(value) => handleNestedChange('represa', 'area', value)} />

<Text style={styles.label}>Fonte de energia / Tipo / Voltagem:</Text><TextInput style={styles.input} 
placeholder="Tipo" value={formData.fonteEnergia.tipo} onChangeText={(value) => handleNestedChange('fonteEnergia', 'tipo', value)} /><TextInput style={styles.input} 
placeholder="Voltagem" value={formData.fonteEnergia.voltagem} onChangeText={(value) => handleNestedChange('fonteEnergia', 'voltagem', value)} />

<Text style={styles.label}>Pastagem nativa predominante:</Text><TextInput style={styles.input} 
placeholder="Pastagem nativa" value={formData.pastagemNativa} onChangeText={(value) => handleChange('pastagemNativa', value)} />

<Text style={styles.label}>Pastagem cultivada / Tipo / Área:</Text><TextInput style={styles.input}
placeholder="Tipo" value={formData.pastagemCultivada.tipo} onChangeText={(value) => handleNestedChange('pastagemCultivada', 'tipo', value)} /><TextInput style={styles.input}
 placeholder="Área" value={formData.pastagemCultivada.area} onChangeText={(value) => handleNestedChange('pastagemCultivada', 'area', value)} />

<Text style={styles.label}>Cercado 1 / Área / Finalidade:</Text><TextInput style={styles.input}
 placeholder="Área" value={formData.cercado1.area} onChangeText={(value) => handleNestedChange('cercado1', 'area', value)} /><TextInput style={styles.input} 
 placeholder="Finalidade" value={formData.cercado1.finalidade} onChangeText={(value) => handleNestedChange('cercado1', 'finalidade', value)} />

<Text style={styles.label}>Cercado 2 / Área / Finalidade:</Text><TextInput style={styles.input}
 placeholder="Área" value={formData.cercado2.area} onChangeText={(value) => handleNestedChange('cercado2', 'area', value)} /><TextInput style={styles.input}
  placeholder="Finalidade" value={formData.cercado2.finalidade} onChangeText={(value) => handleNestedChange('cercado2', 'finalidade', value)} />

<Text style={styles.label}>Outras áreas específicas / Tamanho:</Text><TextInput style={styles.input} 
placeholder="Tamanho" value={formData.outrasAreasEspecificas.tamanho} onChangeText={(value) => handleNestedChange('outrasAreasEspecificas', 'tamanho', value)} />

<Text style={styles.label}>Número de famílias trabalhando no imóvel:</Text><TextInput style={styles.input} 
placeholder="Número de famílias trabalhando" value={formData.numeroFamiliasTrabalhando} onChangeText={(value) => handleChange('numeroFamiliasTrabalhando', value)} />

<Text style={styles.label}>Número de famílias habitando no imóvel:</Text><TextInput style={styles.input} 
placeholder="Número de famílias habitando" value={formData.numeroFamiliasHabitando} onChangeText={(value) => handleChange('numeroFamiliasHabitando', value)} />

<Text style={styles.label}>Proprietário do imóvel:</Text><TextInput style={styles.input} 
placeholder="Proprietário" value={formData.proprietario} onChangeText={(value) => handleChange('proprietario', value)} />

<Text style={styles.label}>CPF:</Text><TextInput style={styles.input} 
placeholder="CPF" value={formData.cpf} onChangeText={(value) => handleChange('cpf', value)} />

<Text style={styles.label}>Contato:</Text><TextInput style={styles.input} 
placeholder="Contato" value={formData.contato} onChangeText={(value) => handleChange('contato', value)} />
        

        {/* Botão para gerar o PDF */}
        <Pressable style={styles.button} onPress={generatePDF}>
        <Text style={styles.buttonText}>Gerar PDF</Text>
      </Pressable>
    </ScrollView>
  </View>
);
}



// Declaração de estilos fora do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  content: {
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: colors.black,
  },
  label: {
    fontSize: 16,
    marginTop: 8,
    color: colors.black,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 4,
    fontSize: 16,
    color: colors.black,
  },
  checkboxGroup: {
    marginTop: 8,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.black,
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});