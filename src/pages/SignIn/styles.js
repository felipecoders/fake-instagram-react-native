import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export const Logo = styled.Image`
  margin-bottom: 20px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  height: 36px;
  align-self: stretch;
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 10px;
  padding: 0 15px;
  font-size: 14px;
  color: #9fa2a2;
`;

export const Button = styled.TouchableOpacity`
  height: 30px;
  align-self: stretch;
  background-color: #3897f0;
  border-radius: 4px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;

export const ContainerButtonSign = styled.View`
  flex-direction: row;
  margin: 20px 0;
  align-items: center;
`;

export const ContainerTextButtonSign = styled.Text`
  color: #333;
  font-weight: 300;
`;

export const ButtonSignUp = styled.TouchableOpacity``;

export const ButtonSignUpText = styled.Text`
  color: #3897f0;
  font-weight: bold;
`;

export const Error = styled.Text`
  padding: 10px;
  color: #f33;
`;
