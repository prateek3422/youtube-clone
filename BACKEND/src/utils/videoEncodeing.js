import { ApiResponse } from "./ApiResponse.js"
import ffmpeg from  "fluent-ffmpeg"
import ffmpegStatic from "ffmpeg-static"


ffmpeg.setFfmpegPath(ffmpegStatic)


const videoEncodeing = async(localFilPath)=>{
  // console.log(localFilPath)

    const inputPath = localFilPath ||'./public/THIS IS 4K ANIME (Unohana： Bankai Minazuki).webm'

  let infg = new ffmpeg

   await infg.addInput(inputPath).outputOptions([
      '-map 0:0',
    '-map 0:1',
    '-map 0:0',
    '-map 0:1',
    '-s:v:0 2160x3840',
    '-c:v:0 libx264',
    '-b:v:0 2000k',
    '-s:v:1 960x540',
    '-c:v:1 libx264',
    '-b:v:1 365k',
    '-master_pl_name master.m3u8',
    '-f hls',
    '-max_muxing_queue_size 1024',
    '-hls_time 1',
    '-hls_list_size 0',
    '-hls_segment_filename', './public/v%v/fileSequence%d.ts'
    ])
    .output("./public/v0/video.m3u8")
    .on('start', function (commandLine) {
      console.log('Spawned Ffmpeg with command: ' + commandLine);
  })
  .on('error', function (err, stdout, stderr) {
      console.log('An error occurred: ' + err.message, err, stderr);
  })
  .on('progress', function (progress) {
      console.log('Processing: ' + progress.percent + '% done')
  })
  .on('end', function (err, stdout, stderr) {
      console.log('Finished processing!' /*, err, stdout, stderr*/)
  })
  .run()

  // return 'success'


}

export{
videoEncodeing
}