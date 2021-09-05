const { create_par_t } = require('./par_t');

const par_t = create_par_t(Buffer(2548));
par_t.fields.BlkBegPar = 0xeeeeeeee;
par_t.fields.BlkEndPar = 0xffffffff;
const update_par_t = (newParameters) => {
  par_t.fields.MdlWupChr.Bkp_x[0] = 0xffff;
  return par_t.fields;
};

const send_par_t = () => {
  par_t.fields.MdlWupChr.Bkp_x[0] = 0xffff;
  console.log(par_t.buffer().toString('hex'));
  return par_t.buffer();
};

const send_static_par_t = () => {
  par_t.fields.MdlWupChr.Bkp_x[0] = 0xffff;
  // olhar quais opções de fields tem que colocar para vir toda a wake-up table
  console.log(par_t.buffer().toString('hex'));
  return par_t.buffer();
};

module.exports = { update_par_t, send_par_t, send_static_par_t };
