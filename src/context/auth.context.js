import { createContext, useEffect, useState } from "react";
import userAuthApi from "../api/user.auth.api";
import companyAuthApi from "../api/company.auth.api";
import { getToken, removeToken } from "../utils/token.utils";

const AuthContext = createContext();

const AuthProviderWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  console.log("isLopggedIn: ", isLoggedIn);
  console.log("user: ", user);

  // função que chama a verificação para saber se o token ainda é válido
  const authenticateUser = async () => {
    const storedToken = getToken();
    // Ao começar a verificação dizemos ao context que estamos carregando a informação
    setIsLoading(true);
    try {
      if (storedToken) {
        // caso exista um token no localStorage, bate no endpoint de verificação
        const response = await userAuthApi.verify();
        setIsLoggedIn(true);
        // a verificação que fizemos no backend nos devolve
        // um objeto com o payload que existia dentro do token
        setUser(response);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      // caso o token seja invalido ou acontecer qualquer erro na verificação
      // removemos o token e guardamos a informação que não existe usuário logado
      console.log("erro context: ", error);
      removeToken();
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      // independente de sucesso ou falha, terminamos a verificação
      setIsLoading(false);
    }
  };

  //COMPANY
  // função que chama a verificação para saber se o token ainda é válido
  const authenticateCompany = async () => {
    const storedToken = getToken();
    // Ao começar a verificação dizemos ao context que estamos carregando a informação
    setIsLoading(true);
    try {
      if (storedToken) {
        // caso exista um token no localStorage, bate no endpoint de verificação
        const response = await companyAuthApi.verify();
        setIsLoggedIn(true);
        // a verificação que fizemos no backend nos devolve
        // um objeto com o payload que existia dentro do token
        setUser(response);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      // caso o token seja invalido ou acontecer qualquer erro na verificação
      // removemos o token e guardamos a informação que não existe usuário logado
      console.log("erro context: ", error);
      removeToken();
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      // independente de sucesso ou falha, terminamos a verificação
      setIsLoading(false);
    }
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    // devolvemos o autenticador, com as funções e valores relevantes para serem invocadas fora dele.
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        authenticateUser,
        authenticateCompany,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// exportamos um objeto com ambos o componente e o contexto
export { AuthContext, AuthProviderWrapper };
