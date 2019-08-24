import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px 20px 0;
`;

export const SelectButton = styled.TouchableOpacity`
  border-radius: 4px;
  border: 1px dashed #ccc;
  height: 42px;
  justify-content: center;
  align-items: center;
`;

export const SelectButtonText = styled.Text`
  font-size: 16px;
  color: #666;
`;

export const Preview = styled.Image`
  width: 100px;
  height: 100px;
  margin-top: 10px;
  align-self: center;
  border-radius: 4px;
`;

export const Input = styled.TextInput`
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 7px 15px;
  margin-top: 10px;
  font-size: 16px;
`;

export const ShareButton = styled.TouchableOpacity`
  background-color: #3897f0;
  border-radius: 4px;
  height: 42px;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
`;

export const ShareButtonText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #fff;
`;
