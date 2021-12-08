/* eslint-disable */
const express = require('express');
const RoastController = require('./Controllers/RoastController');
const MarkController = require('./Controllers/MarkController');
const {
  connectToParameters, connectToDataPort, disconnectData, writeNewWifi,
} = require('./Clients/manager');
const ThemeController = require('./Controllers/ThemeController');
const { sendMachineParams, sendLutToMachine } = require('./Clients/client_LUTs');

const routes = express.Router();
// Server side

routes.get('/', RoastController.get);
routes.get('/getUniqueRoastData/:roast_id', RoastController.getUniqueRoastData);
routes.get('/getLastTheme', ThemeController.get);
routes.get('/marks/:roast_id', MarkController.getByRoastId);

routes.delete('/deleteLastRoast', RoastController.deleteLast);
routes.delete('/deleteSpecificRoast/:roast_id', RoastController.deleteSpecific);

routes.post('/setChartParams', RoastController.create);
routes.post('/saveMark/:roast_id', MarkController.create);
routes.post('/changeWifi', writeNewWifi);
routes.post('/sendData', RoastController.bounceToData);
routes.post('/setMachineParameters', RoastController.bounceToParameters);
routes.post('/sendMachineParameters', RoastController.sendParameters);
routes.post('/sendStaticLUTs/:roast_id', RoastController.sendStaticParameters);

routes.put('/updateLastTheme', ThemeController.updateLastTheme);
routes.post('/sendUploadFile', RoastController.sendUploadFile);

// socket side
routes.get('/connectData', connectToDataPort);
routes.get('/disconnectData', disconnectData);
routes.get('/connectParameters', connectToParameters);

routes.post('/sendLUT', (req, res, next) => {
  sendLutToMachine(req, res)
})

/* Existem duas possibilidades
 * Usuário subiu um arquivo de LUT e quer usar ele
 *  => Usuário subiu um arquivo, validar o arquivo
 *    => Chamar a funçao create_par_t(arquivo_escolhido), 
 *      => Se não der problema (se der problema cai no try catch) 
 *        significa que a LUT está correta (a prória lib captura o erro 'Buffer size is not valid' +-)
 *      => Verificar os Headers de validação . BlkBegPar => 'eeeeeeee', BlkEndPar => 'ffffffff'
 *          igual no client_data.js
 *      => Se tudo der certo a LUT está correta e pode ser enviada
 *      => Salvar a LUT como um BUFFER(precisa ser um buffer para facilitar nossa vida)
 *  
 *   => Enviando para a máquina 
 *    => Pegar o arquivo com o Node, via fs, e enviar pela função /sendMachineParameters 
 *    => Depois disso, sucesso! :)
 * 
 *    => A grande diferença entre as duas possibilidades é como o arquivo salvo é lido pelo sistema, e entra em arquitetura de código
 *    => Ai vocês estão livres para selecionar o que acharem mais viável
 *
 * 
 *  
*/


module.exports = routes;
