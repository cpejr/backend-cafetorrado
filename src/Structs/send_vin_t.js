const { create_vin_t } = require('./vin_t');

const vin_t = create_vin_t();

function update_vin_t(data) {
  const {
    MdlManChr, MdlManInj,
    MdlManCdr, MdlManCar,
    MdlExhAcv, MdlMisAcv,
    MdlIgnAcv, MdlAlmAcv,
    ItfModReq, VinEndRes_0,
    VinEndRes_1, VinEndRes_2,
  } = data;
  vin_t.fields.MdlManChr = MdlManChr ?? vin_t.fields.MdlManChr;
  vin_t.fields.MdlManInj = MdlManInj ?? vin_t.fields.MdlManInj;
  vin_t.fields.MdlManCdr = MdlManCdr ?? vin_t.fields.MdlManCdr;
  vin_t.fields.MdlManCar = MdlManCar ?? vin_t.fields.MdlManCar;
  vin_t.fields.MdlExhAcv = MdlExhAcv ?? vin_t.fields.MdlExhAcv;
  vin_t.fields.MdlMisAcv = MdlMisAcv ?? vin_t.fields.MdlMisAcv;
  vin_t.fields.MdlIgnAcv = MdlIgnAcv ?? vin_t.fields.MdlIgnAcv;
  vin_t.fields.MdlAlmAcv = MdlAlmAcv ?? vin_t.fields.MdlAlmAcv;
  vin_t.fields.ItfModReq = ItfModReq ?? vin_t.fields.ItfModReq;
  vin_t.fields.VinEndRes_0 = VinEndRes_0 ?? vin_t.fields.VinEndRes_0;
  vin_t.fields.VinEndRes_1 = VinEndRes_1 ?? vin_t.fields.VinEndRes_1;
  vin_t.fields.VinEndRes_2 = VinEndRes_2 ?? vin_t.fields.VinEndRes_2;
}

function send_vin_t() {
  return vin_t.buffer();
}

module.exports = { update_vin_t, send_vin_t };
