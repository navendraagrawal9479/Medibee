import tf from '@tensorflow/tfjs-node';
// const sharp = require('sharp');
// const fs = require('fs');

export const predict = async (req, res) => {
  const modelPath = './MediBee_BTP.ipynb';
  const loadedModel = await tf.loadLayersModel(`file://${modelPath}`);

  console.log(loadedModel);
}