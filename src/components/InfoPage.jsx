import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import axios from "axios";
import cheerio from "cheerio";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const InfoPage = () => {
  const params = useParams();
  const { medicine } = params;
  const [info, setInfo] = useState(null);
  const { palette } = useTheme();
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(100000);

  async function med_info(salt) {
    setLoading(true);
    const html = await axios.get(`https://www.apollopharmacy.in/salt/${salt}`);
    const $ = cheerio.load(html.data);

    const info = $(".ProductDetailsGeneric_descListing__w3wG3")
      .map((i, el) => ({
        title: $(el).find("h2").text(),
        data: $(el).find("p, div").text(),
      }))
      .get();

    if (!$) return;

    const med_cards = $(".SaltMedicines_saltLink__7cBrq")
      .map((i, el) => ({
        name: $(el).find("p").text(),
        price: $(el).find(".SaltMedicines_mrpBx__mwrKA").text(),
      }))
      .get();

    const InfoData = {
      info: info,
      med_cards: med_cards,
    };

    if (med_cards) {
      let minimum = minPrice;
      med_cards?.forEach(med => {
        const price = Number(med.price.replace('₹', ''));
        if (price < minimum) {
          minimum = price;
        }
      });
      setMinPrice(minimum);
    }
    setInfo(InfoData);
    setLoading(false);

    return InfoData;
  }

  useEffect(() => {
    med_info(medicine).then((data) => {
      !data ? console.log("salt not found") : console.log(data?.info[0]?.data);
    });
  }, []);

  console.log(minPrice);

  if (loading) {
    return (
      <Typography
        style={{
          color: palette.cyan,
          fontFamily: "Gilroy",
          fontSize: "1.5rem",
          m: "0 auto",
        }}
      >
        Salt Not Found.
      </Typography>
    );
  }

  if (!info && !loading) {
    return (
      <Typography
        style={{
          color: palette.cyan,
          fontFamily: "Gilroy",
          fontSize: "1.5rem",
          m: "0 auto",
        }}
      >
        Salt Not Found.
      </Typography>
    );
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          m: 2,
          width: "90%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            m: "2rem auto",
          }}
        >
          <Typography
            style={{
              color: palette.cyan,
              fontFamily: "Gilroy",
              fontSize: "1.5rem",
              m: "0 auto",
            }}
          >
            Medicine: {medicine}
          </Typography>
        </Box>
        <Stack direction={"row"} gap={3}>
          {info?.info.length > 0 ? (
            <Stack
              gap={2}
              justifyContent={"center"}
              sx={{
                flex: 2,
              }}
            >
              {info?.info?.map((i) => {
                return (
                  <Stack gap={2}>
                    <Typography
                      style={{
                        color: palette.lightBlue,
                        fontFamily: "Gilroy",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {i.title}
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Comfortaa",
                        fontSize: "1rem",
                        color: "#fff",
                      }}
                    >
                      {i.data.split("\n")[0]}
                    </Typography>
                  </Stack>
                );
              })}
              <Typography
                style={{
                  fontFamily: "Comfortaa",
                  fontSize: "1rem",
                  color: "#fff",
                }}
              >
                {info?.info[info.info.length - 1]?.data}
              </Typography>
            </Stack>
          ) : (
            <Typography
              style={{
                color: palette.cyan,
                fontFamily: "Gilroy",
                fontSize: "1.5rem",
                m: "0 auto",
                flex: 2
              }}
            >
              No Details Available
            </Typography>
          )}
          <Stack
            gap={2}
            sx={{
              flex: "1",
            }}
          >
            <Typography
              style={{
                color: palette.cyan,
                fontFamily: "Gilroy",
                fontSize: "1.5rem",
                m: "0 auto",
              }}
            >
              Recommended Medicines
            </Typography>
            {info?.med_cards?.map((med) => {
              return (
                <>
                  <Typography
                    style={{
                      color: palette.lightBlue,
                      fontFamily: "Gilroy",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {med.name.substring(0, med.name.indexOf('₹'))}
                  </Typography>
                  {minPrice === Number(med.price.replace('₹', '')) ? (
                    <Stack
                      direction='row'
                      alignItems={'center'}
                      gap={2}
                    >
                      <Typography
                        style={{
                          fontFamily: "Comfortaa",
                          fontSize: "1.3rem",
                          fontWeight: "bold",
                          color: palette.lightGreen,
                        }}
                      >
                        {med.price}
                      </Typography>
                      <Stack
                        direction='row'
                        alignItems={'center'}
                        justifyContent={'center'}
                        sx={{
                          p: 1,
                        }}
                        gap={1}
                      >
                        <CheckCircleIcon sx={{color: palette.cyan}} />
                        <Typography
                          style={{
                            fontFamily: "Gilroy",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            color: palette.cyan,
                          }}
                        >
                          Lowest Price
                        </Typography>
                      </Stack>
                    </Stack>
                  ) : (
                    <Typography
                      style={{
                        fontFamily: "Comfortaa",
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        color: palette.lightGreen,
                      }}
                    >
                      {med.price}
                    </Typography>
                  )}

                </>
              );
            })}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default InfoPage;
