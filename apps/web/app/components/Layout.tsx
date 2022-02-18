import { Link as MuiLink } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "@remix-run/react";
import * as React from "react";

const pages = [{ to: "users", name: "Users" }];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <MuiLink
              component={Link}
              variant="h6"
              noWrap
              to="/"
              sx={{
                mr: 4,
                color: "white",
                textDecoration: "none",
                fontFamily: "'Gorditas'",
                fontSize: "1.9rem",
              }}
            >
              PINE WORKS
            </MuiLink>
            <Box sx={{ flexGrow: 1 }}>
              {pages.map((page) => (
                <MuiLink
                  key={page.name}
                  component={Link}
                  to={page.to}
                  prefetch="intent"
                  sx={{ my: 2, color: "white" }}
                >
                  {page.name}
                </MuiLink>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ mt: "90px" }}>
        <Box sx={{ my: 4 }}>{children}</Box>
      </Container>
    </>
  );
}
