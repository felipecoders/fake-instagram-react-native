import React, {useState, useEffect} from 'react';
import {StackActions, NavigationActions} from 'react-navigation';

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
import {setToken, isAuth} from '../../services/auth';

import logo from '../../assets/logo.png';

export default function SignIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function applyError(message) {
    setError(message);
    setTimeout(() => setError(''), 3000);
  }

  useEffect(() => {
    async function checkLogged() {
      if (await isAuth()) {
        goToHome();
      }
    }
    checkLogged();
  }, []);

  async function handleLogin() {
    try {
      if (!email || !password) {
        applyError('Preencha todos os campos para logar!');
        return;
      }

      const {data} = await api.post('/signin', {
        email,
        password,
      });

      await setToken(data.token);
      goToHome();
    } catch (e) {
      console.error(e);
      applyError('login e/ou senha incorretos!');
    }
  }

  function goToHome() {
    // reseta a stack de navegação para que o usuario não
    // retorne para a tela de login clicando em voltar
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Home'})],
    });
    // dispara o evento de reset da stack
    navigation.dispatch(resetAction);
  }

  function goToSignUp() {
    navigation.navigate('SignUp');
  }

  return (
    <Container>
      <Logo source={logo} />

      {!!error && <Error>{error}</Error>}

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

      <Button onPress={handleLogin}>
        <ButtonText>Entrar</ButtonText>
      </Button>

      <ContainerButtonSign>
        <ContainerTextButtonSign>Não tem uma conta? </ContainerTextButtonSign>
        <ButtonSignUp onPress={goToSignUp}>
          <ButtonSignUpText>Cadastre-se</ButtonSignUpText>
        </ButtonSignUp>
      </ContainerButtonSign>
    </Container>
  );
}

SignIn.navigationOptions = () => ({
  header: null,
});
