/* eslint-disable no-unused-expressions */

const { Struct } = require('struct');
const { create_vin_t } = require('./vin_t');

const vin_t = create_vin_t();

function update_vin_t(data) {
  console.log(data);
  const {
    MdlManChr, MdlManInj,
    MdlManCdr, MdlManCar,
    MdlExhAcv, MdlMisAcv,
    MdlIgnAcv, MdlAlmAcv,
    MdlModReq,
  } = data;
  vin_t.fields.MdlManChr = MdlManChr ?? vin_t.fields.MdlManChr;
  vin_t.fields.MdlManInj = MdlManInj ?? vin_t.fields.MdlManInj;
  vin_t.fields.MdlManCdr = MdlManCdr ?? vin_t.fields.MdlManCdr;
  vin_t.fields.MdlManCar = MdlManCar ?? vin_t.fields.MdlManCar;
  vin_t.fields.MdlExhAcv = MdlExhAcv ?? vin_t.fields.MdlExhAcv;
  vin_t.fields.MdlMisAcv = MdlMisAcv ?? vin_t.fields.MdlMisAcv;
  vin_t.fields.MdlIgnAcv = MdlIgnAcv ?? vin_t.fields.MdlIgnAcv;
  vin_t.fields.MdlAlmAcv = MdlAlmAcv ?? vin_t.fields.MdlAlmAcv;
  vin_t.fields.MdlModReq = MdlModReq ?? vin_t.fields.MdlManCar;
}

function send_vin_t() {
  return vin_t.buffer();
}

module.exports = { update_vin_t, send_vin_t };
