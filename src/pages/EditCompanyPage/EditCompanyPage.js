import "./EditCompanyPage.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AlertTitle, Alert, Typography } from "@mui/material/";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signupLogo from "../../img/icons/signup.png";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import CompanyApi from "../../api/company.api";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const theme = createTheme();

const EditCompanyPage = () => {
  const { user, logOutUser, updateCompany } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [addresses, setAddresses] = useState(user.addresses);
  const [profileImg, setProfileImg] = useState(user.profileImg);

  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("1111", isLoading);
    try {
      console.log("22222", isLoading);
      setIsLoading(true);
      await CompanyApi.edit({
        name,
        username,
        email,
        phone,
        addresses,

        profileImg,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setAlertIsOpen(true);
      setIsLoading(false);
      updateCompany();

      setTimeout(() => navigate("/"), 5000);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await CompanyApi.delete();
      logOutUser();
      navigate("/");
    } catch (error) {}
  };

  return (
    <ThemeProvider theme={theme}>
      {alertIsOpen ? (
        <Alert severity="success">
          <AlertTitle>Informa????es atualizadas!</AlertTitle>
          {`O cadastro de ${user.name} foi atualizado!`}
          <p>Redirecionando para a p??gina inicial ...</p>
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
            <Avatar
              sx={{ m: 1, width: 50, height: 50 }}
              src={signupLogo}
            ></Avatar>
            <Typography component="h1" variant="h5">
              Editar Usu??rio
            </Typography>
            <Box component="form" onSubmit={handleEdit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    fullWidth
                    id="name"
                    label="Nome Completo"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="username"
                    label="Nome de Usu??rio"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
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
                    id="addresses"
                    label="Endere??o"
                    name="addresses"
                    autoComplete="addresses"
                    value={addresses}
                    onChange={(e) => setAddresses(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    //
                    fullWidth
                    name="profileImg"
                    label="Foto de Perfil"
                    type="file"
                    id="profileImg"
                    autoComplete="new-profile-image"
                    onChange={(e) => setProfileImg(e.target.files[0])}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disable={isLoading}
              >
                Editar
              </Button>
              <Button
                onClick={handleDelete}
                color="error"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disable={isLoading}
              >
                Apagar Perfil{" "}
              </Button>
              <Grid container justifyContent="flex-end"></Grid>
            </Box>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
};

export default EditCompanyPage;
