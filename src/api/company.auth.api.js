import axios from "axios";
import { isEmpty } from "../utils/validation.utils";
import { handleResponseError } from "../utils/errors.utils";
import { getToken, storeToken } from "../utils/token.utils";

class authApi {
  constructor() {
    // configuração do axios para usar sempre como base ou o q está no arquivo `.env`
    // ou, caso não exista, o localhost:5000.
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL_USER || "http://localhost:5050",
    });
  }

  // método de cadastro/signup
  // crie uma função de signup que envia os dados de cadastro para o nosso endpoint da API
  signup = async ({
    name,
    username,
    email,
    phone,
    addresses,
    category,
    subcategory,
    profileImg,
    coverImg,
    password,
    services,
    description,
    offers,
  }) => {
    try {
      //   const hasEmptyFields = isEmpty(username, password);
      //   if (hasEmptyFields) {
      //     throw new Error('Campos obrigatórios.')
      //   }
      await this.api.post("/company/auth/cadastro", {
        name,
        username,
        email,
        phone,
        addresses,
        category,
        subcategory,
        profileImg,
        coverImg,
        password,
        services,
        description,
        offers,
      });
    } catch (error) {
      handleResponseError(error);
    }
  };

  // método de login
  // crie uma função de login que envia os dados de login para o nosso endpoint da API
  // em caso de sucesso, receberemos o token de volta, você pode usar a função auxiliar de armazenar o token no
  // localStorage, essa função será criada mais adiante.

  login = async ({ username, password }) => {
    try {
      const hasEmptyFields = isEmpty(username, password);
      if (hasEmptyFields) {
        throw new Error("Campos obrigatórios.");
      }
      const { data } = await this.api.post("/company/auth/login", {
        username,
        password,
      });
      console.log(data.authToken);
      storeToken(data.authToken);
    } catch (error) {
      handleResponseError(error);
    }
  };

  // método de verificação
  verify = async () => {
    // recupera o token que estiver armazenado no localStorage
    const token = getToken();
    try {
      // faz a requisição no backend colocando o token na autorização dos headers.
      // esperamos a resposta ser as informações de dentro do token.
      const { data } = this.api.get("/company/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      handleResponseError(error);
    }
  };
}

const CompanyAuthApi = new authApi();
export default CompanyAuthApi;
