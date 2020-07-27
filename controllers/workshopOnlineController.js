const { workshopOnline, sequelize, Sequelize } = require("../models");
const { uploader } = require("../helpers/uploader");
const { URL_API } = require("../helpers/api_url");
const FormData = require("form-data");
const axios = require("axios");
// const {
//     createJWTToken,
//     createForgotPasswordToken,
//   } = require("../helpers/jwtoken");
module.exports = {
  uploadVideoByAdmin: (req, res) => {
    try {
      const path = "/student/video";
      const upload = uploader(path, "courses_video").fields([
        { name: "courses_video" },
        { name: "image_video" },
      ]);

      upload(req, res, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Upload picture failed !", error: err.message });
        }

        const { courses_video, image_video } = req.files;
        console.log(req.files);

        const videoPath = courses_video
          ? path + "/" + courses_video[0].filename
          : "";
        const imagePath = image_video
          ? path + "/" + image_video[0].filename
          : "";

        const { title, slug } = JSON.parse(req.body.data);

        // // Simpan database

        let formData = new FormData();

        formData.append("title", courses_video[0].filename);
        formData.append("source_video_url", `${URL_API}${videoPath}`);

        let options = {
          headers: {
            "SproutVideo-Api-Key": "2e6f3e845d50d6a94c25a407280bb687",
            "Content-Type":
              "multipart/form-data; boundary=" + formData.getBoundary(),
            "Content-Length": formData.getLengthSync(),
          },
        };

        console.log(options);
        console.log("Jalan sampe sini 1");

        axios
          .post(`https://api.sproutvideo.com/v1/videos`, formData, options)
          .then((resultVideo) => {
            console.log(resultVideo);
            console.log(videoPath);

            console.log(resultVideo.data);

            workshopOnline
              .create({
                program_name: title,
                slug,
                thumbnail_video: imagePath,
                videoSproutId: resultVideo.data.id,
                securityTokenSprout: resultVideo.data.security_token,
                durationVideo: resultVideo.data.duration,
              })
              .then((results) => {
                // fs.unlinkSync('./public', videoPath);
                return res.status(200).send({ message: "Success" });
              })
              .catch((err) => {
                return res.status(500).send({ message: "Failed" });
              });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          "There's an error on the server. Please contact the administrator.",
        error: error.message,
      });
    }
  },

  webHooksVideo: (req, res) => {
    // console.log(req.body);

    // data yang didapat dari sproutvideo yang dikirim dari backend dia ke backend kita.

    const titleVideo = req.body.title;

    if (req.body.state === "deployed") {
      console.log("=================== state video", req.body.state);
      workshopOnline
        .update(
          {
            durationVideo: req.body.duration,
          },
          {
            where: {
              videoSproutId: req.body.id,
            },
          }
        )
        .then((results) => {
          console.log("=================== title video", titleVideo);
          const path = "student/video"; // path video
          // kita gunakan nama video yang di server menjadi title di video pada hostingan.

          fs.unlinkSync(`./public/${path}/${titleVideo}`);

          return res
            .status(200)
            .send({ message: "Success Update and Delete Video" });
        })
        .catch((err) => {
          return res.status(500).send({ message: "Failed" });
        });
    }
  },
};
