/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Navigation, Autoplay } from "swiper/modules";

// Sample data
const featuredList = [
  {
    image:
      "https://i.pinimg.com/564x/8a/d3/17/8ad317d9ebc4df05bb920769caa91816.jpg",
    title: "Nike Air Max 97",
    description: "For Street Heat"
  },
  {
    image:
      "https://i.pinimg.com/564x/8a/d3/17/8ad317d9ebc4df05bb920769caa91816.jpg",
    title: "Explore the Outdoors",
    description: "Expore thhe Outdoors"
  },
  {
    image:
      "https://i.pinimg.com/564x/8a/d3/17/8ad317d9ebc4df05bb920769caa91816.jpg",
    title: "Nike Pro",
    description: "Nike Pro"
  },
  {
    image:
      "https://i.pinimg.com/564x/8a/d3/17/8ad317d9ebc4df05bb920769caa91816.jpg",
    title: "Back to School",
    description: "Back to School"
  }
];

const Home = () => {
  const swiperRef = useRef<any>(null);

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
    >
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ width: "100%", p: "40px 30px", bgcolor: "#e6e6e6" }}
      >
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          loop
          style={{ width: "100%", textAlign: "center" }}
        >
          <SwiperSlide>
            <Stack
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Typography sx={{ fontSize: "17px", fontWeight: "500" }}>
                New Styles on Sale: Up to 40% Off
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
              >
                Shop All Our New Markdowns
              </Typography>
            </Stack>
          </SwiperSlide>
          <SwiperSlide>
            <Stack
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Typography sx={{ fontSize: "17px", fontWeight: "500" }}>
                Move, Shop, Customise & Celebrate With Us.
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
              >
                No matter what you feel like doing today, It’s better as a
                Member. Join Us
              </Typography>
            </Stack>
          </SwiperSlide>
          <SwiperSlide>
            <Stack
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Typography sx={{ fontSize: "17px", fontWeight: "500" }}>
                Free Delivery
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px"
                }}
              >
                Applies to orders of 5.000.000₫ or more. View details
              </Typography>
            </Stack>
          </SwiperSlide>
        </Swiper>
        <video
          src="/introvid.mp4"
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "auto",
            marginTop: "20px",
            marginBottom: "30px"
          }}
        />
        <Typography variant="h3" sx={{ fontWeight: "700" }}>
          FEED YOUR SPEED
        </Typography>
        <Typography marginBottom={"10px"}>
          Accelerate your game in the next-gen Mercurial
        </Typography>
        <Button
          sx={{
            color: "#fff",
            transform: "lowercase",
            p: "5px 10px",
            bgcolor: "#000",
            borderRadius: "20px",
            "&:hover": {
              bgcolor: "#8f8f8f"
            }
          }}
        >
          Shop
        </Button>
      </Stack>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ width: "90%", marginTop: "30px" }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ width: "100%", marginTop: "30px" }}
        >
          <Typography variant="h6">Featured</Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={5}
          >
            <KeyboardDoubleArrowLeftIcon
              sx={{ fontSize: "20px", cursor: "pointer" }}
              onClick={handlePrevSlide}
            />
            <KeyboardDoubleArrowRightIcon
              sx={{ fontSize: "20px", cursor: "pointer" }}
              onClick={handleNextSlide}
            />
          </Stack>
        </Stack>

        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={3}
          loop
          style={{ width: "80%", height: "auto" }}
        >
          {featuredList.map((item, index) => (
            <SwiperSlide key={index}>
              <Stack
                direction={"column"}
                alignItems={"start"}
                justifyContent={"center"}
                gap={1}
                marginBottom={"20px"}
                sx={{
                  padding: "10px",
                  borderRadius: "10px"
                }}
              >
                <img
                  src={item.image}
                  alt={`Featured Item ${index + 1}`}
                  style={{ width: "100%", height: "auto" }}
                />
                <Typography
                  variant="body1"
                  sx={{ fontSize: "17px", fontWeight: "700" }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "25px",
                    fontWeight: "500",
                    marginBottom: "10px"
                  }}
                >
                  {item.description}
                </Typography>
                <Link to={"/product"} style={{ color: "#000" }}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "600",
                      cursor: "pointer",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: "0%",
                        height: "2px",
                        bottom: "-2px",
                        left: "0",
                        backgroundColor: "black",
                        transition: "width 0.3s ease-in-out"
                      },
                      "&:hover::after": {
                        width: "100%"
                      }
                    }}
                  >
                    Shop
                  </Typography>
                </Link>
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    </Stack>
  );
};

export default Home;
