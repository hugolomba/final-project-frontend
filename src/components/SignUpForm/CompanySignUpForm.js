import "./CompanySignUpForm.css";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LinkMUI from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AlertTitle, Alert, Typography } from "@mui/material/";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signupLogo from "../../img/icons/signup.png";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import CompanyAuthApi from "../../api/company.api";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addresses, setAddresses] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [password, setPassword] = useState("");

  const [description, setDescription] = useState("");
  const [instagram, setInstagram] = useState("");
  // const [whatsapp, setWhatsapp] = useState("");

  const { setIsLoading, isLoading } = useContext(AuthContext);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [errorAlertIsOpen, setErrorAlertIsOpen] = useState(false);
  let errorMessage = "";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("🚀 before ~ isLoading", isLoading);
    try {
      await CompanyAuthApi.signup({
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
        description,
        instagram,
        // whatsapp,
      });
      setErrorAlertIsOpen(false);
      setIsLoading(false);
      console.log("🚀 after ~ isLoading", isLoading);
      setAlertIsOpen(true);
      const redirect = setTimeout(() => navigate("/company/signin"), 5000);
    } catch (error) {
      errorMessage = error.message;
      setErrorAlertIsOpen(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {errorAlertIsOpen && (
        <Alert severity="error">
          <AlertTitle>Error no Cadastro!</AlertTitle>
          {`O cadastro de ${name} não foi realizado!`}
          <p>{errorMessage}</p>
        </Alert>
      )}

      {alertIsOpen ? (
        <Alert severity="success">
          <AlertTitle>Cadastro Realizado!</AlertTitle>
          {`O cadastro de ${name} foi cadastrado!`}
          <p>Redirecionando para a página de login de empresa ...</p>
        </Alert>
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, width: 50, height: 50 }} src={signupLogo}>
              {/* <LockOutlinedIcon /> */}
              {/* <img src={signupLogo} />  */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Cadastro de Empresa
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Nome Completo"
                    autoFocus
                    //   error
                    //   helperText="Incorrect entry."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Nome de Usuário"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="phone"
                    label="Telefone"
                    name="phone"
                    autoComplete="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="instagram"
                    label="Instagram"
                    name="instagram"
                    helperText="apenas o @"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="whatsapp"
                    label="Whatsapp"
                    name="whatsapp"
                    helperText="+55(XX)XXXXXXXXX"
                    autoComplete="whatsapp"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="addresses"
                    label="Endereço"
                    name="addresses"
                    autoComplete="addresses"
                    value={addresses}
                    onChange={(e) => setAddresses(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    select
                    id="category"
                    label="Categoria"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem selected value="Teste1">
                      restaurante
                    </MenuItem>
                    <MenuItem value="Teste2">farmácia</MenuItem>
                    <MenuItem value="Teste3">mercado</MenuItem>
                    <MenuItem value="Teste4">eventos</MenuItem>
                    <MenuItem value="Teste4">bebidas</MenuItem>
                    <MenuItem value="Teste4">serviços</MenuItem>
                    <MenuItem value="Teste4">serv. domésticos</MenuItem>
                    <MenuItem value="Teste4">tecnologia</MenuItem>
                    <MenuItem value="Teste4">moda</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    //   required
                    fullWidth
                    select
                    id="subcategory"
                    label="Subcategoria"
                    name="subcategory"
                    autoComplete="subcategory"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                  >
                    <MenuItem value="Teste1">Teste 1</MenuItem>
                    <MenuItem value="Teste2">Teste 2</MenuItem>
                    <MenuItem value="Teste3">Teste 3</MenuItem>
                    <MenuItem value="Teste4">Teste 4</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    //   required
                    fullWidth
                    name="profile-image"
                    label="Foto de Perfil"
                    type="file"
                    id="profile-image"
                    autoComplete="new-profile-image"
                    onChange={(e) => setProfileImg(e.target.files[0])}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    //   required
                    fullWidth
                    name="description"
                    label="Descrição"
                    multiline
                    rows={5}
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="services"
                  label="Serviços"
                  type="services"
                  id="services"
                  autoComplete="services"
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                />
  
              </Grid> */}
                {/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="offers"
                  label="Ofertas"
                  type="offers"
                  id="offers"
                  autoComplete="offers"
                  value={offers}
                  onChange={(e) => setOffers(e.target.value)}
                />
              
              </Grid> */}
                {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                Cadastrar Empresa
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  {/* <LinkMUI href="/user/signin" variant="body2"> */}
                  <Link to="/company/signin">
                    Already have an account? Sign in
                  </Link>
                  {/* </LinkMUI> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
      )}
    </ThemeProvider>
  );
}
