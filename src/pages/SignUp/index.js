import React, {useState} from 'react';
import {
  Container,
  Logo,
  Input,
  Button,
  ButtonText,
  Error,
  ButtonSignUp,
  ButtonSignUpText,
  ContainerButtonSign,
  ContainerTextButtonSign,
} from './styles';

import api from '../../services/api';

import logo from '../../assets/logo.png';

export default function SignUp({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function applyError(message) {
    setError(message);
    setTimeout(() => setError(''), 3000);
  }

  async function handleSignUp() {
    try {
      if (!name || !password || !email || !confirmPassword) {
        applyError('Preencha todos os campos para se cadastrar');
        return;
      }

      if (password !== confirmPassword) {
        applyError('As senhas não conferem!');
        return;
      }

      await api.post('/signup', {
        name,
        email,
        password,
      });

      navigation.navigate('SignIn');
    } catch (e) {
      console.error(e);
      applyError('Um erro ocorreu ao tentar se cadastrar!');
    }
  }

  function goToSignIn() {
    navigation.goBack();
  }

  return (
    <Container>
      <Logo source={logo} />

      {!!error && <Error>{error}</Error>}

      <Input
        textContentType="emailAddress"
        autoCapitalize="none"
        autoCorrect={false}
        value={name}
        onChangeText={e => setName(e)}
        placeholder="Nome"
      />
      <Input
        textContentType="emailAddress"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={e => setEmail(e)}
        placeholder="Email"
      />
      <Input
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={e => setPassword(e)}
        placeholder="Senha"
      />
      <Input
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        value={confirmPassword}
        onChangeText={e => setConfirmPassword(e)}
        placeholder="Confirme sua senha"
      />

      <Button onPress={handleSignUp}>
        <ButtonText>Cadastrar</ButtonText>
      </Button>

      <ContainerButtonSign>
        <ContainerTextButtonSign>Já possui uma conta? </ContainerTextButtonSign>
        <ButtonSignUp onPress={goToSignIn}>
          <ButtonSignUpText>Logar</ButtonSignUpText>
        </ButtonSignUp>
      </ContainerButtonSign>
    </Container>
  );
}

SignUp.navigationOptions = () => ({
  header: null,
});
