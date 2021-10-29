/* eslint-disable */
const fs = require('fs');
const { application } = require('express');
const roastModel = require('../Models/RoastModel');
const { update_vin_t } = require('../Structs/send_vin_t');
const { update_par_t } = require('../Structs/send_par_t');
const { sendNewParameters } = require('../Clients/manager');
const { sendStaticParams } = require('../Clients/client_LUTs');
const { create_par_t } = require('../Structs/par_t');
const { connectMachineParams } = require('../Clients/client_LUTs');
/*
Pra testar, eu to fazendo o seguinte, criei um arquivo par_t baseado nos parametros que a gente tem
coloquei os header e alterei um valor dentro de uma das lookuptables, daí quando chama a rota criada
eu escrevo no arquivo a LUT que eu criei na mão, leio de dentro desse arquivo e jogo dentro da
maquina o valor lido.
*/
const par_t = create_par_t(Buffer(2548));
par_t.fields.BlkBegPar = 0xeeeeeeee;
par_t.fields.BlkEndPar = 0xffffffff;
// Altere aqui para mudar o valor que é enviado e recebido
par_t.fields.MdlWupChr.Bkp_x[0] = 822;

module.exports = {
  async create(req, res) {
    try {
      const Roast = req.body;
      const result = await roastModel.create(Roast);
      return res.status(200).json(result);
    } catch (err) {
      console.warn(`There has been an error on the creation of the roast:\n${err}`);
      return res.status(500).json({
        error: 'Failed to create Roast',
      });
    }
  },

  async get(req, res) {
    try {
      const result = await roastModel.get();
      return res.status(200).json(result);
    } catch (err) {
      console.warn(`There has been an error on the creation of the roast:\n${err}`);
      return res.status(500).json({
        error: 'Failed to get Roasts',
      });
    }
  },

  async deleteLast(req, res) {
    fs.rmdir('src/RoastArchive/TEMPORARY', { recursive: true }, (err) => { if (err) throw err; });
    return res.status(200).json({ message: 'Roast sucessfully Deleted' });
  },

  async deleteSpecific(req, res) {
    try {
      const { roast_id } = req.params;
      fs.rmdir(`src/RoastArchive/${roast_id}`, { recursive: true }, (err) => { if (err) throw err; });
      const result = await roastModel.deleteById(roast_id);
      return res.status(200).json(result);
    } catch (err) {
      console.log(`Roast delete failed: ${err}`);
      return res.status(500).json({
        notification: 'Internal server error while trying to delete Roast',
      });
    }
  },

  async getUniqueRoastData(req, res) {
    try {
      const { roast_id } = req.params;
      // eslint-disable-next-line
      const data = require(`../RoastArchive/${roast_id}/ParsedData.json`);
      return res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Message: 'ERRO', err });
    }
  },

  async bounceToData(req, res) {
    try {
      update_vin_t(req.body);
      return res.status(200).json({ Message: 'Sucessfully changed data' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Message: 'There has been an error on the update' });
    }
  },
  async bounceToParameters(req, res) {
    try {
      const struct = update_par_t(req.body);
      return res.status(200).json({ Message: 'Sucessfully changed parameters of LUTs', struct });
    } catch (err) {
      return res.status(500).json({ Message: 'There has been an error on the update' });
    }
  },
  async sendParameters(req, res) {
    try {
      const result = await sendNewParameters();
      return res.status(200).json({ Message: 'Sucessfully sent parameters of LUTs', result });
    } catch (err) {
      return res.status(500).json({ Message: 'There has been an error on the update of LUTs' });
    }
  },

  async sendStaticParameters(req, res) {
    try {
      // const { roast_id } = req.params;
      // Com o encoding descoberto é ajeitar pra logica que já haviamos discutido
      try {
        // Crio o arquivo teste com um buffer do tamanho correto com as validações necessárias
        fs.writeFileSync('src/RoastArchive/testfile', par_t.buffer());
        // leio desse arquivo que acabei de criar. O encoding é o padrão mesmo, então nem precisa
        // colocar nada
        const PARDATA = fs.readFileSync('src/RoastArchive/testfile');
        // envio pra maquina o arquivo
        await sendStaticParams(PARDATA);
        // leio o dado e verifico se está corretp
        const data = await connectMachineParams();
        return res.status(200).json({ message: 'Parameters sent to esp, YES', DATA: data.fields.MdlWupChr.Bkp_x[0] });
        // Averiguar com o Hnerique: QUando a porta 888 é aberta, enviado os dados e fechada,
        // bloqueia o envio de mais dados. É preciso reiniciar o sistema. Bug?
      } catch (error) {
        return res.status(500).json({ error });
      }
    } catch (error) {
      console.log(req.params);
      return res.status(500).json({ Message: req.params });
    }
  },
};
