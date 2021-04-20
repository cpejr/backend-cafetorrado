/*
 * header.h
 *
 *  Created on: Mar 27, 2021
 *      Author: Mescua
 */

#ifndef INC_HEADER_H_
#define INC_HEADER_H_

/*
	MEMORY
	{
	   CCMRAM  (xrw)    : ORIGIN = 0x10000000,   LENGTH = 64K
	   RAM     (xrw)    : ORIGIN = 0x20000000,   LENGTH = 103K
	  *CTL     (xrw)    : ORIGIN = 0x20019C00,   LENGTH = 12K
	  *VAR     (xrw)    : ORIGIN = 0x2001CC00,   LENGTH = 1K
	  *DAQ     (xrw)    : ORIGIN = 0x2001D000,   LENGTH = 4K
	  *WPG     (xrw)    : ORIGIN = 0x2001E000,   LENGTH = 8K
	   FLASH   (rx)     : ORIGIN = 0x08000000,   LENGTH = 384K
	   RPG     (rx)     : ORIGIN = 0x08060000,   LENGTH = 8K
	}
*/

/*
Par = {.Par = { .BlkBegPar = Par_Beg,
				.MdlWupChr = {{200,328.5714286,457.1428571,585.7142857,714.2857143,842.8571429,971.4285714,1100,1228.571429,1357.142857,1485.714286,1614.285714,1742.857143,1871.428571,2000},
							  {105,112,119,126,133,140,147,154,161,168,175,182,189,196,203}},
				.MdlRunInj = {{110.00f,117.86f,125.71f,133.57f,141.43f,149.29f,157.14f,165.00f,172.86f,180.71f,188.57f,196.43f,204.29f,212.14f,220.00f},
							  {200.00f,328.57f,457.14f,585.71f,714.29f,842.86f,971.43f,1100.00f,1228.57f,1357.14f,1485.71f,1614.29f,1742.86f,1871.43f,2000.00f},
							  {95.00f,5.60f,5.60f,5.60f,7.00f,8.50f,10.00f,10.00f,10.00f,10.00f,7.00f,5.60f,5.60f,5.60f,5.60f,
							   95.00f,6.25f,6.25f,6.25f,7.69f,9.23f,10.76f,10.76f,10.76f,10.76f,7.69f,6.25f,6.25f,6.25f,6.25f,
							   95.00f,6.93f,6.93f,6.93f,8.40f,9.98f,11.55f,11.55f,11.55f,11.55f,8.40f,6.93f,6.93f,6.93f,6.93f,
							   95.00f,7.63f,7.63f,7.63f,9.14f,10.75f,12.36f,12.36f,12.36f,12.36f,9.14f,7.63f,7.63f,7.63f,7.63f,
							   95.00f,8.36f,8.36f,8.36f,9.90f,11.55f,13.20f,13.20f,13.20f,13.20f,9.90f,8.36f,8.36f,8.36f,8.36f,
							   95.00f,9.11f,9.11f,9.11f,10.69f,12.38f,14.06f,14.06f,14.06f,14.06f,10.69f,9.11f,9.11f,9.11f,9.11f,
							   95.00f,9.89f,9.89f,9.89f,11.50f,13.23f,14.95f,14.95f,14.95f,14.95f,11.50f,9.89f,9.89f,9.89f,9.89f,
							   95.00f,10.69f,10.69f,10.69f,12.34f,14.10f,15.86f,15.86f,15.86f,15.86f,12.34f,10.69f,10.69f,10.69f,10.69f,
							   95.00f,11.52f,11.52f,11.52f,13.20f,15.00f,16.80f,16.80f,16.80f,16.80f,13.20f,11.52f,11.52f,11.52f,11.52f,
							   95.00f,11.87f,11.87f,11.87f,13.51f,15.28f,17.04f,17.04f,17.04f,17.04f,13.51f,11.87f,11.87f,11.87f,11.87f,
							   95.00f,12.19f,12.19f,12.19f,13.80f,15.53f,17.25f,17.25f,17.25f,17.25f,13.80f,12.19f,12.19f,12.19f,12.19f,
							   95.00f,12.49f,12.49f,12.49f,14.06f,15.75f,17.44f,17.44f,17.44f,17.44f,14.06f,12.49f,12.49f,12.49f,12.49f,
							   95.00f,12.76f,12.76f,12.76f,14.30f,15.95f,17.60f,17.60f,17.60f,17.60f,14.30f,12.76f,12.76f,12.76f,12.76f,
							   95.00f,13.01f,13.01f,13.01f,14.51f,16.13f,17.74f,17.74f,17.74f,17.74f,14.51f,13.01f,13.01f,13.01f,13.01f,
							   95.00f,13.23f,13.23f,13.23f,14.70f,16.28f,17.85f,17.85f,17.85f,17.85f,14.70f,13.23f,13.23f,13.23f,13.23f}},
				.MdlCorAir = {{-20.00f,-14.29f,-8.57f,-2.86f,2.86f,8.57f,14.29f,20.00f,25.71f,31.43f,37.14f,42.86f,48.57f,54.29f,60.00f},
							  {20.00f,24.29f,28.57f,32.86f,37.14f,41.43f,45.71f,50.00f,54.29f,58.57f,62.86f,67.14f,71.43f,75.71f,80.00f},
							  {0.80f,0.84f,0.89f,0.93f,0.97f,1.01f,1.06f,1.10f,1.14f,1.19f,1.23f,1.27f,1.31f,1.36f,1.40f,
							   0.77f,0.81f,0.86f,0.90f,0.94f,0.99f,1.03f,1.07f,1.11f,1.16f,1.20f,1.24f,1.29f,1.33f,1.37f,
							   0.74f,0.79f,0.83f,0.87f,0.91f,0.96f,1.00f,1.04f,1.09f,1.13f,1.17f,1.21f,1.26f,1.30f,1.34f,
							   0.71f,0.76f,0.80f,0.84f,0.89f,0.93f,0.97f,1.01f,1.06f,1.10f,1.14f,1.19f,1.23f,1.27f,1.31f,
							   0.69f,0.73f,0.77f,0.81f,0.86f,0.90f,0.94f,0.99f,1.03f,1.07f,1.11f,1.16f,1.20f,1.24f,1.29f,
							   0.66f,0.70f,0.74f,0.79f,0.83f,0.87f,0.91f,0.96f,1.00f,1.04f,1.09f,1.13f,1.17f,1.21f,1.26f,
							   0.63f,0.67f,0.71f,0.76f,0.80f,0.84f,0.89f,0.93f,0.97f,1.01f,1.06f,1.10f,1.14f,1.19f,1.23f,
							   0.60f,0.64f,0.69f,0.73f,0.77f,0.81f,0.86f,0.90f,0.94f,0.99f,1.03f,1.07f,1.11f,1.16f,1.20f,
							   0.57f,0.61f,0.66f,0.70f,0.74f,0.79f,0.83f,0.87f,0.91f,0.96f,1.00f,1.04f,1.09f,1.13f,1.17f,
							   0.54f,0.59f,0.63f,0.67f,0.71f,0.76f,0.80f,0.84f,0.89f,0.93f,0.97f,1.01f,1.06f,1.10f,1.14f,
							   0.51f,0.56f,0.60f,0.64f,0.69f,0.73f,0.77f,0.81f,0.86f,0.90f,0.94f,0.99f,1.03f,1.07f,1.11f,
							   0.49f,0.53f,0.57f,0.61f,0.66f,0.70f,0.74f,0.79f,0.83f,0.87f,0.91f,0.96f,1.00f,1.04f,1.09f,
							   0.46f,0.50f,0.54f,0.59f,0.63f,0.67f,0.71f,0.76f,0.80f,0.84f,0.89f,0.93f,0.97f,1.01f,1.06f,
							   0.43f,0.47f,0.51f,0.56f,0.60f,0.64f,0.69f,0.73f,0.77f,0.81f,0.86f,0.90f,0.94f,0.99f,1.03f,
							   0.40f,0.44f,0.49f,0.53f,0.57f,0.61f,0.66f,0.70f,0.74f,0.79f,0.83f,0.87f,0.91f,0.96f,1.00f}},
				.AdcFacFil = {0.2f, 0.2f, 0.2f},
				.TmpFacFil = {0.1f, 0.1f},
				.BchFatFil =   0.2f,
				.BchFapFil =   0.2f,
				.BchFahFil =   0.2f,
				.MdlWuhCdr =  70.0f,
				.MdlWuhCar =  60.0f,
				.MdlWuhTgr = 225.0f,
				.MdlWuhErr =  10.0f,
				.MdlWulCdr =  70.0f,
				.MdlWulCar =  80.0f,
				.MdlWulErr =  10.0f,
				.MdlChrCdr =  70.0f,
				.MdlChrCar =  80.0f,
				.MdlChrFil =  0.01f,
				.MdlChrTmp =   8.0f,
				.MdlRunCdr =  70.0f,
				.MdlRunCar =  80.0f,
				.MdlSdwCdr =  60.0f,
				.MdlSdwCar =  80.0f,
				.MdlSdwLim =  60.0f,
				.MdlInjMin =   3.0f,
				.MdlInjMax =  95.0f,
				.MdlAirMin =  25.0f,
				.MdlAirMax =  90.0f,
				.MdlWuhCnt =   500U,
				.MdlWulCnt =  1500U,
				.BlkEndPar = Par_End
			   };
                                   */

//Configuração WiFi Original
#define SID_WIFI  "ROASTER_000001"
#define PAS_WIFI  "000001_ROASTER"
#define CHN_WIFI  13
#define HID_WIFI  false

#define ADC_CMAX 3
#define TMP_CMAX 2
#define INV_CMAX 2
#define L1D_SMAX 15U
#define L2D_SMAX 15U

#define CMDLEN   184U
#define CTLLEN   62U

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

// InvDgoSet

/* Spi_Rxb.Mem.Daq.InvDgoSet[0].RO1 = TmpVar.MdlMisAcv;
Spi_Rxb.Mem.Daq.InvDgoSet[0].RO2 = TmpVar.MdlIgnAcv;
Spi_Rxb.Mem.Daq.InvDgoSet[1].RO1 = TmpVar.MdlExhAcv;
Spi_Rxb.Mem.Daq.InvDgoSet[1].RO2 = TmpVar.MdlAlmAcv; */

//Lookup Table 1D data type
typedef struct
{
	float    Bkp_x[L1D_SMAX]; //4 * 15
	float    Tbl_z[L1D_SMAX]; //4 * 15
} lut1D_t; // 2 * (4 * 15)

//Lookup Table 2D data type
typedef struct
{
	float    Bkp_x[L2D_SMAX]; //4 * 15
	float    Bkp_y[L2D_SMAX]; //4 * 15
	float    Tbl_z[L2D_SMAX*L2D_SMAX]; //4 * 15 * 15
} lut2D_t; //2 * (4 * 15) + 4 * 15 * 15

//Enumeração do store req.
typedef enum
{
	Str_Off = 0x00U,
	Str_Req = 0x55U
}   strst_t;

//Enumeração do status store req.
typedef enum
{
	Mem_Off = 0U,
	Mem_Str = 1U,
} memst_t;

//Enumeração dos blocos de memória.
typedef enum
{
	Cfg_Beg = 0x44444444U,
	Cfg_End = 0x55555555U, //Header da Configuração do WiFi
	Ctl_Beg = 0x66666666U,
	Ctl_End = 0x77777777U, //Header do Pacode de controle
	Cmd_Beg = 0x88888888U,
	Cmd_End = 0x99999999U, //Header do Comando de controle
	Var_Beg = 0xAAAAAAAAU,
	Var_End = 0xBBBBBBBBU, //Header das variáveis de controle
	Daq_Beg = 0xCCCCCCCCU,
	Daq_End = 0xDDDDDDDDU, //Header das variáveis de leitura
	Par_Beg = 0xEEEEEEEEU,
	Par_End = 0xFFFFFFFFU  //Header do parâmetros
} blk_t;

// Pacote enviado no start da comunicação da porta 555 com tamanho de 72 bytes.
// Caso pacote seja recebido com tamanho de 72 bytes com os headers corretos na porta 555 os valores são salvos na eeprom.
// Caso o botão flash for pressionado por mais de 5 segundos a configuração do WiFi será resetada.
typedef struct
{
	blk_t Beg;    //4
	char Sid[31]; //31
	char Pas[31]; //31 - Mínimo de 7 bytes
	uint8_t Chn;  //1
	uint8_t Hid;  //1
	blk_t End;    //4
} wifcfg_t;

typedef struct
{
	blk_t       BlkBegCmd; //0x88888888     //4
	uint8_t*    CmdMemAdr; //0x2001CC04     //4
	uint16_t    CmdMemLen; //40             //2
	uint8_t     CmdMemVal[CMDLEN]; //Memcpy  //184
	blk_t       BlkEndCmd; //0x999999999     //4 ===
} cmd_t;

typedef struct
{
	blk_t       BlkBegCtl; //0x66666666     //4
	uint32_t    CtlMemLen; //1              //4
	cmd_t       CtlMemVal[CTLLEN]; //Memcpy //198*62 = 12276
	blk_t       BlkEndCtl; //0x77777777     //4 = 12288
} ctl_t; 

typedef enum
{
	Sts_Off  =  0U,
	Sts_Man  =  1U,
	Sts_Wuh  =  2U,
	Sts_Wul  =  3U,
	Sts_Chr  =  4U,
	Sts_Run  =  5U,
	Sts_Sdw  =  6U
} mdlst_t;

typedef struct
{
	blk_t       BlkBegVar;//4
	float       MdlManChr;//4
	float       MdlManInj;//4
	float       MdlManCdr;//4
	float       MdlManCar;//4
	float       MdlTarVal;//4
	float       MdlTgrVal;//4
	uint8_t     MdlTarAcv;//1
	uint8_t     MdlTgrAcv;//1
	uint8_t     MdlExhAcv;//1
	uint8_t     MdlMisAcv;//1
	uint8_t     MdlIgnAcv;//1
	uint8_t     MdlAlmAcv;//1
	strst_t     MemStrReq;//1
	mdlst_t     MdlModReq;//1
	blk_t       BlkEndVar;//4
} var_t;

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

typedef enum
{
	Inv_Ini   = 0,
	Inv_Run   = 1,
	Inv_Txo   = 2,
	Inv_Rxo   = 3,
	Inv_Rxc   = 4,
	Inv_Rsp   = 5,
	Inv_Rco   = 6,
	Inv_Ger   = 7
} invst_t;

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
} tmpst_t;

typedef enum
{
	Adc_Ini = 0U,
	Adc_Run = 1U
} adcst_t;

typedef enum
{
	Bch_Ini = 0U,
	Bch_Run = 1U,
	Bch_Ier = 2U,
	Bch_Rer = 3U
} bchst_t;

// Pacote enviado no start da comunicação da porta 888 com tamanho de 0x2000 bytes.
// Valor atual 2284 bytes
typedef struct
{
	blk_t       BlkBegPar;
	lut1D_t     MdlWupChr;
	lut2D_t     MdlRunInj;
	lut2D_t     MdlCorAir;
	float       AdcFacFil[ADC_CMAX];
	float       TmpFacFil[TMP_CMAX];
	float       BchFatFil;
	float       BchFapFil;
	float       BchFahFil;
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
	float		MdlRunCdr;
	float		MdlRunCar;
	float       MdlSdwCdr;
	float       MdlSdwCar;
	float		MdlSdwLim;
	float       MdlInjMin;
	float       MdlInjMax;
	float       MdlAirMin;
	float       MdlAirMax;
	uint16_t    MdlWuhCnt;
	uint16_t    MdlWulCnt;
	blk_t       BlkEndPar;
} par_t;

// Pacote enviado com ciclicidade de 200ms enquanto a porta 888 estiver aberta com tamanho de 0x1000 bytes.
// Valor atual 220 bytes
typedef struct
{
	blk_t       BlkBegDaq; // 4
	uint32_t    MdlRunCnt; // 4 Tempo de Maquina Funcionando
	float       AdcInpLin[ADC_CMAX]; //3*4
	float       AdcInpScl[ADC_CMAX]; //3*4
	float       TmpInpLin[TMP_CMAX]; //2*4
	float       TmpInpScl[TMP_CMAX]; //2*4
	float       CpuTmpScl; //4
	float       CpuVrfScl; //4
	float       CpuVbtScl; //4
	float       BchTmpLin; //4
	float       BchTmpScl; //4
	float       BchPrsLin;
	float       BchPrsScl;
	float       BchHumLin;
	float       BchHumScl;
	float       InvSpdReq[INV_CMAX];
	float       InvTrqReq[INV_CMAX];
	float       InvTmpScl[INV_CMAX];
	float       InvPrsScl;
	float       InjPwmReq;
	float       MdlAirScl; // Temperatura do Ar Scaled = 175
	float       MdlGraScl; // Temperatura do Grao Scaled = 145
	float       MdlDisErr; // Erro do Modelo = 5
	float       MdlInjOut; // Percentual de chama = 25
	float       MdlDruOut; // Percentual de tambor = 65
	float       MdlAirOut; // Percentual de ar = 75
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
	invst_t     InvModSts[INV_CMAX];
	tmpst_t     TmpModSts[TMP_CMAX];
	adcst_t     AdcModSts;
	mdlst_t     ItfMdlPrv;
	mdlst_t     MdlModPrv;
	mdlst_t     MdlModSts;
	bchst_t     BchModSts;
	memst_t     MemStrReq;
	memst_t     MemModSts;
	blk_t       BlkEndDaq;
} daq_t;

#endif /* INC_HEADER_H_ */