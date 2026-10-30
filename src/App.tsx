import { useMUIThemeContext } from "@abhishekzambare/mui";
import { ThemeProvider } from "@mui/material";
import { useMainServices } from "./MainServices";
import { useEffect } from "react";
import PaymentReview from "./PaymentReview";
import paymentReviewData from "./paymentReview.json";

function App() {
  const theme = useMUIThemeContext();
  const Mainservices = useMainServices();

  useEffect(() => {
    Mainservices.getUser();
  }, []);

  return (
    <ThemeProvider theme={theme.Theme_WebApp_Theme}>
      <>
        <PaymentReview data={paymentReviewData} />
        {/* <Stack
          spacing={2}
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Stack direction="column">
            <TextField
              name="name"
              value={MainContext.name}
              onChange={(e) => MainContext.setName(e.target.value)}
            />
            <TextField
              name="email"
              value={MainContext.email}
              onChange={(e) => MainContext.setEmail(e.target.value)}
            />

            <br />
            <MUITable
              pagination={true}
              pageNumber={1}
              pageSize={10}
              pageTotalCount={100}
              setPageNumber={() => {}}
              setPageSize={() => {}}
              columns={[
                {
                  width: "200px",
                  name: "Email",
                  value: "email",
                  onSortClick: () => {},
                  render: (row: any) => (
                    <>
                      <Tooltip title={row.emailAddress}>
                        <Typography
                          variant="subtitle2"
                          noWrap
                          sx={{
                            textOverflow: "ellipsis",
                          }}
                        >
                          {row.email}
                        </Typography>
                      </Tooltip>
                    </>
                  ),
                },
                {
                  width: "200px",
                  name: "Name",
                  value: "name",
                },
              ]}
              data={MainContext.user}
            />
          </Stack>

          <Button
            onClick={() => {
              Mainservices.submitUser();
            }}
          >
            Contained
          </Button>

          <YinYangThemesMenu />
        </Stack> */}
      </>
    </ThemeProvider>
  );
}

export default App;
