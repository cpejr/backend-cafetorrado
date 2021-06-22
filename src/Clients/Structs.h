#define TCP_PDAT  555
#define TCP_PPAR  888

#define TCP_TQLE  24

typedef enum
{
	Vin_Beg = 0xAAAAAAAAU,
	Vin_End = 0xBBBBBBBBU,
	Vou_Beg = 0xCCCCCCCCU,
	Vou_End = 0xDDDDDDDDU,
	Par_Beg = 0xEEEEEEEEU,
	Par_End = 0xFFFFFFFFU
} blk_t;

#define ADC_CMAX 3
#define TMP_CMAX 2
#define INV_CMAX 2
#define L1D_SMAX 15U
#define L2D_SMAX 15U

typedef enum
{
	Sts_Off  =  0U,
	Sts_Man  =  1U,
	Sts_Wuh  =  2U,
	Sts_Wul  =  3U,
	Sts_Chr  =  4U,
	Sts_Uds  =  5U,
	Sts_Run  =  7U,
	Sts_Sdw  =  8U
} PACKED mdlst_t;

typedef enum
{
	Inv_Ini   = 0U,
	Inv_Run   = 1U,
	Inv_Txo   = 2U,
	Inv_Rxo   = 3U,
	Inv_Rxc   = 4U,
	Inv_Rsp   = 5U,
	Inv_Rco   = 6U,
	Inv_Ger   = 7U
} PACKED invst_t;

typedef enum
{
	Tmp_Ini  = 0,
	Tmp_Run  = 1,
	Tmp_Eoc  = 2,
	Tmp_Eov  = 3,
	Tmp_Etl  = 4,
	Tmp_Eth  = 5,
	Tmp_Ecl  = 6,
	Tmp_Ech  = 7,
	Tmp_Etr  = 8,
	Tmp_Ecr  = 9
} PACKED tmpst_t;

typedef enum
{
	Adc_Ini = 0U,
	Adc_Run = 1U
} PACKED adcst_t;

typedef enum
{
	Bch_Ini = 0U,
	Bch_Run = 1U,
	Bch_Ier = 2U,
	Bch_Rer = 3U
} PACKED bchst_t;

typedef struct
{
	uint16_t DO1:1;
	uint16_t DO2:1;
	uint16_t DO3:1;
	uint16_t DO4:1;
	uint16_t DO5:1;
	uint16_t DO6:1;
	uint16_t DO7:1;
	uint16_t DO8:1;
	uint16_t RO1:1;
	uint16_t RO2:1;
	uint16_t RO3:1;
	uint16_t RO4:1;
	uint16_t RO5:1;
	uint16_t RO6:1;
	uint16_t RO7:1;
	uint16_t RO8:1;
} abbio_t;

typedef struct
{
	float       MdlManChr;
	float       MdlManInj;
	float       MdlManCdr;
	float       MdlManCar;
	uint8_t     MdlExhAcv;
	uint8_t     MdlMisAcv;
	uint8_t     MdlIgnAcv;
	uint8_t     MdlAlmAcv;
	mdlst_t     MdlModReq;
	uint8_t     VinEndRes_0;
	uint8_t     VinEndRes_1;
	uint8_t     VinEndRes_2;
} vib_t;

typedef struct
{
	blk_t       BlkBegVin;
	vib_t       PkgBlkVin;
	blk_t       BlkEndVin;
} vin_t;

typedef struct
{
	uint32_t    MdlWrkCnt;
	float       AdcInpLin[ADC_CMAX];
	float       AdcInpScl[ADC_CMAX];
	float       TmpInpLin[TMP_CMAX];
	float       CpuTmpScl;
	float       CpuVrfScl;
	float       CpuVbtScl;
	float       BchTmpLin;
	float       BchTmpScl;
	float       BchPrsLin;
	float       BchPrsScl;
	float       BchHumLin;
	float       BchHumScl;
	float       InvSpdReq[INV_CMAX];
	float       InvTrqReq[INV_CMAX];
	float       InvTmpScl[INV_CMAX];
	float       InvPrsScl;
	float       InjPwmReq;
	float       MdlGraLin;
    float       MdlGraScl;
	float       MdlAirLin;
	float       MdlAirScl;
    float       MdlRorPrv;
    float       MdlRorCur;
    float       MdlRorVal;
    float       MdlDisErr;
	float       MdlInjOut;
	float       MdlDruOut;
	float       MdlAirOut;
	float       MdlTmpInt;
	float       MdlTmpTgr;
	float       MdlCorAir;
	int16_t     InvSpdSet[INV_CMAX];
	int16_t     InvTrqSet[INV_CMAX];
	int16_t     InvAd0Get[INV_CMAX];
	int16_t     InvAd1Get[INV_CMAX];
	abbio_t     InvDgoSet[INV_CMAX];
	uint16_t    InvTxoCnt[INV_CMAX];
	uint16_t    InvRxoCnt[INV_CMAX];
	uint16_t    InvRxcCnt[INV_CMAX];
	uint16_t    InvRspCnt[INV_CMAX];
	uint16_t    InvRedCnt[INV_CMAX];
	uint16_t    InvWriCnt[INV_CMAX];
	uint16_t    InjPwmSet;
	uint16_t    MdlLocCnt;
	uint16_t    MdlGenCnt;
	uint16_t    MdlRunCnt;
	invst_t     InvModSts[INV_CMAX];
	tmpst_t     TmpModSts[TMP_CMAX];
	adcst_t     AdcModSts;
	mdlst_t     ItfMdlPrv;
	mdlst_t     MdlModPrv;
	mdlst_t     MdlModSts;
	bchst_t     BchModSts;
	uint8_t     VouEndRes_0;
	uint8_t     VouEndRes_1;
	uint8_t     VouEndRes_2;
} vob_t;

typedef struct
{
	blk_t       BlkBegVou;
	vob_t       PkgBlkVou;
	blk_t       BlkEndVou;
} vou_t;

typedef struct
{
	vin_t PkgPkgVin;
	vou_t PkgPkgVou;
} memvar_t;

typedef struct
{
	float    Bkp_x[L1D_SMAX];
	float    Tbl_z[L1D_SMAX];
} lut1D_t;

typedef struct
{
	float    Bkp_x[L2D_SMAX];
	float    Bkp_y[L2D_SMAX];
	float    Tbl_z[L2D_SMAX*L2D_SMAX];
} lut2D_t;

typedef struct
{
	lut1D_t     MdlWupChr;
	lut1D_t     MdlRunCdr;
	lut1D_t     MdlRunCar;
	lut2D_t     MdlRunCin;
	lut2D_t     MdlCorAir;
	float       AdcFacFil[ADC_CMAX];
	float       BchFatFil;
	float       BchFapFil;
	float       BchFahFil;
	float       MdlGraFil;
	float       MdlRorFil;
	float       MdlAirFil;
	float       MdlWuhCdr;
	float       MdlWuhCar;
	float       MdlWuhTgr;
	float       MdlWuhErr;
	float       MdlWulCdr;
	float       MdlWulCar;
	float       MdlWulErr;
	float       MdlChrCdr;
	float       MdlChrCar;
	float       MdlChrFil;
	float       MdlChrTmp;
	float       MdlUdsCdr;
	float       MdlUdsCar;
	float       MdlUdsCin;
	float       MdlUdsHys;
	float       MdlSdwCdr;
	float       MdlSdwCar;
	float		MdlSdwLim;
	float       MdlDruMin;
	float       MdlDruMax;
	float       MdlAirMin;
	float       MdlAirMax;
	float       MdlInjMin;
	float       MdlInjMax;
	uint16_t    MdlWuhCnt;
	uint16_t    MdlWulCnt;
	uint16_t    MdlRunCor;
	uint8_t     ParEndRes_0;
	uint8_t     ParEndRes_1;
} pab_t;

typedef struct
{
	blk_t       BlkBegPar;
	pab_t       PkgBlkPar;
	blk_t       BlkEndPar;
} mempar_t;