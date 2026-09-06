'use strict'

let commentFlag = false
let ws = undefined

function getCommentFlag() {
  return commentFlag
}

function setCommentFlag(value) {
  commentFlag = value
}

function getTimeString() {
  let date = new Date()
  let result = ''
  let value

  result += date.getFullYear().toString()

  result += '-'
  value = (date.getMonth() + 1).toString()
  while (value.length < 2) {
    value = '0' + value
  }
  result += value

  result += '-'
  value = date.getDate().toString()
  while (value.length < 2) {
    value = '0' + value
  }
  result += value

  result += ' '
  value = date.getHours().toString()
  while (value.length < 2) {
    value = '0' + value
  }
  result += value

  result += ':'
  value = date.getMinutes().toString()
  while (value.length < 2) {
    value = '0' + value
  }
  result += value

  result += ':'
  value = date.getSeconds().toString()
  while (value.length < 2) {
    value = '0' + value
  }
  result += value

  result += '.'
  value = date.getMilliseconds().toString()
  while (value.length < 3) {
    value = '0' + value
  }
  result += value

  return result
}

function hexToString(hex) {
  let inData = hex.split('')
  let outData = ''
  let i, high, low
  let value

  for (i = 0; i < inData.length / 2; ++i) {
    switch (inData[i * 2]) {
      case '0': { high = 0; break; }
      case '1': { high = 1; break; }
      case '2': { high = 2; break; }
      case '3': { high = 3; break; }
      case '4': { high = 4; break; }
      case '5': { high = 5; break; }
      case '6': { high = 6; break; }
      case '7': { high = 7; break; }
      case '8': { high = 8; break; }
      case '9': { high = 9; break; }
      case 'A': { high = 10; break; }
      case 'B': { high = 11; break; }
      case 'C': { high = 12; break; }
      case 'D': { high = 13; break; }
      case 'E': { high = 14; break; }
      case 'F': { high = 15; break; }
      case 'a': { high = 10; break; }
      case 'b': { high = 11; break; }
      case 'c': { high = 12; break; }
      case 'd': { high = 13; break; }
      case 'e': { high = 14; break; }
      case 'f': { high = 15; break; }
      default: { return outData; }
    }
    switch (inData[i * 2 + 1]) {
      case '0': { low = 0; break; }
      case '1': { low = 1; break; }
      case '2': { low = 2; break; }
      case '3': { low = 3; break; }
      case '4': { low = 4; break; }
      case '5': { low = 5; break; }
      case '6': { low = 6; break; }
      case '7': { low = 7; break; }
      case '8': { low = 8; break; }
      case '9': { low = 9; break; }
      case 'A': { low = 10; break; }
      case 'B': { low = 11; break; }
      case 'C': { low = 12; break; }
      case 'D': { low = 13; break; }
      case 'E': { low = 14; break; }
      case 'F': { low = 15; break; }
      case 'a': { low = 10; break; }
      case 'b': { low = 11; break; }
      case 'c': { low = 12; break; }
      case 'd': { low = 13; break; }
      case 'e': { low = 14; break; }
      case 'f': { low = 15; break; }
      default: { return outData; }
    }
    value = high * 16 + low
    if ((value === 0x2D) || (value === 0x5F) || (value === 0x2E) || (value === 0x21) || (value === 0x7E) || (value === 0x2A) || (value === 0x27) || (value === 0x28) || (value === 0x29) || ((value > 0x2F) && (value < 0x3A)) || ((value > 0x40) && (value < 0x5B)) || ((value > 0x60) && (value < 0x7B))) {
      outData += String.fromCharCode(value)
    } else {
      outData += '%'
      value = value.toString(16)
      if (value.length < 2) {
        outData += '0'
      }
      outData += value
    }
  }

  try {
    outData = decodeURIComponent(outData).replace(/\0[\s\S]*$/g,'')
  } catch (e) {
    outData = ''
  }

  return outData
}

function stringToHex(data) {
  let code = encodeURIComponent(data.replace(/\0[\s\S]*$/g,''))
  let bytes = []
  let result = ''

  for (let i = 0; i < code.length; ++i) {
    let c = code.charAt(i)
    if (c === '%') {
      let hex = code.charAt(i + 1) + code.charAt(i + 2)
      let hexval = parseInt(hex, 16)
      bytes.push(hexval)
      i += 2
    } else {
      bytes.push(c.charCodeAt(0))
    }
  }

  for (let i = 0; i < bytes.length; ++i) {
    let str = bytes[i].toString(16).toUpperCase()
    if (str.length < 2) {
      result += '0'
    }
    result += str
  }

  return result
}

function hexToDecValue(hex) {
  let inData = hex.split('')
  let outData = -1
  let i, value

  if (inData.length <= 0) {
    return outData;
  }

  outData = 0
  for (i = 0; i < inData.length; ++i) {
    outData *= 16
    switch (inData[i]) {
      case '0': { value = 0; break; }
      case '1': { value = 1; break; }
      case '2': { value = 2; break; }
      case '3': { value = 3; break; }
      case '4': { value = 4; break; }
      case '5': { value = 5; break; }
      case '6': { value = 6; break; }
      case '7': { value = 7; break; }
      case '8': { value = 8; break; }
      case '9': { value = 9; break; }
      case 'A': { value = 10; break; }
      case 'B': { value = 11; break; }
      case 'C': { value = 12; break; }
      case 'D': { value = 13; break; }
      case 'E': { value = 14; break; }
      case 'F': { value = 15; break; }
      case 'a': { value = 10; break; }
      case 'b': { value = 11; break; }
      case 'c': { value = 12; break; }
      case 'd': { value = 13; break; }
      case 'e': { value = 14; break; }
      case 'f': { value = 15; break; }
      default: { return outData; }
    }
    outData += value
  }

  return outData
}

async function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

async function openWs(url, timeMs) {
  if (typeof (ws) !== 'undefined') {
    return false
  }

  try {
    ws = new WebSocket(url)
  } catch (error) {
    return false
  }

  let onopen = new Promise((resolve) => {
    ws.onopen = function (evt) {
      return resolve(true)
    }
  })

  let onclose = new Promise((resolve) => {
    ws.onclose = function (evt) {
      return resolve(false)
    }
  })

  let onmessage = new Promise((resolve) => {
    ws.onmessage = function (evt) {
      return resolve(false)
    }
  })

  let onerror = new Promise((resolve) => {
    ws.onerror = function (evt) {
      return resolve(false)
    }
  })

  let timeout = new Promise((resolve) => {
    setTimeout(function () {
      return resolve(false)
    }, timeMs)
  })

  await Promise.race([onopen, onclose, onmessage, onerror, timeout])

  ws.onopen = undefined
  ws.onclose = undefined
  ws.onmessage = undefined
  ws.onerror = undefined

  if (ws.readyState !== WebSocket.OPEN) {
    ws.close()
    ws = undefined
    return false
  }

  return true
}

async function closeWs() {
  if (typeof (ws) === 'undefined') {
    return
  }

  ws.close()
  ws = undefined
}

async function ReadMessage(timeMs) {
  if (typeof (ws) === 'undefined') {
    return
  }

  let onopen = new Promise((resolve) => {
    ws.onopen = function (evt) {
      return resolve(undefined)
    }
  })

  let onclose = new Promise((resolve) => {
    ws.onclose = function (evt) {
      return resolve(undefined)
    }
  })

  let onmessage = new Promise((resolve) => {
    ws.onmessage = function (evt) {
      return resolve(evt.data)
    }
  })

  let onerror = new Promise((resolve) => {
    ws.onerror = function (evt) {
      return resolve(undefined)
    }
  })

  let timeout = new Promise((resolve) => {
    setTimeout(function () {
      return resolve(undefined)
    }, timeMs)
  })

  let result = await Promise.race([onopen, onclose, onmessage, onerror, timeout])

  ws.onopen = undefined
  ws.onclose = undefined
  ws.onmessage = undefined
  ws.onerror = undefined

  return result
}

async function WriteMessage(msg) {
  if (typeof (ws) === 'undefined') {
    return false
  }

  try {
    ws.send(msg)
  } catch (error) {
    return false
  }

  return true
}

async function callDcrf32(data, timeMs) {
  let result

  if (commentFlag) {
    if (typeof (localStorage['wy.pro.dcrf32demo.storage.comment']) === 'undefined') {
      localStorage['wy.pro.dcrf32demo.storage.comment'] = ''
    }
    localStorage['wy.pro.dcrf32demo.storage.comment'] += '[dcrf32][time:' + getTimeString() + ']'
    localStorage['wy.pro.dcrf32demo.storage.comment'] += 'send:' + data
  }

  result = await WriteMessage(data)
  if (!result) {
    if (commentFlag) { localStorage['wy.pro.dcrf32demo.storage.comment'] += '[time:' + getTimeString() + '][error]\n' }
    return
  }
  if (commentFlag) { localStorage['wy.pro.dcrf32demo.storage.comment'] += '[time:' + getTimeString() + '][ok]\n' }

  if (commentFlag) {
    localStorage['wy.pro.dcrf32demo.storage.comment'] += '[dcrf32][time:' + getTimeString() + ']'
    localStorage['wy.pro.dcrf32demo.storage.comment'] += 'recv:'
  }

  result = await ReadMessage(timeMs)
  if (typeof (result) === 'undefined') {
    if (commentFlag) { localStorage['wy.pro.dcrf32demo.storage.comment'] += '[time:' + getTimeString() + '][error]\n' }
    return
  }
  if (commentFlag) { localStorage['wy.pro.dcrf32demo.storage.comment'] += result + '[time:' + getTimeString() + '][ok]\n' }

  return result
}

async function LibMain(flag, context) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"LibMain","in":["' + flag.toString() + '","' + context + '"]}'
  outStr = await callDcrf32(inStr, 5000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = obj.out[0]

  return result
}

async function dc_config_port_name(port, name) {
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_config_port_name","in":["' + port.toString() + '","' + name + '"]}'
  outStr = await callDcrf32(inStr, 5000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }
}

async function dc_init(port, baud) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_init","in":["' + port.toString() + '","' + baud.toString() + '"]}'
  outStr = await callDcrf32(inStr, 30000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_init_name(port, baud, name) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_init_name","in":["' + port.toString() + '","' + baud.toString() + '","' + name + '"]}'
  outStr = await callDcrf32(inStr, 30000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_exit(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_exit","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_beep(icdev, _Msec) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_beep","in":["' + icdev.toString() + '","' + _Msec.toString() + '"]}'
  outStr = await callDcrf32(inStr, _Msec * 10 + 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_getver(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_getver","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_readdevsnr(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_readdevsnr","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_GetDeviceUid(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_GetDeviceUid","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_ctlled(icdev, cLed, cOpenFlag) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_ctlled","in":["' + icdev.toString() + '","' + cLed.toString() + '","' + cOpenFlag.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}


async function dc_setmag(icdev, mode, track1,track2,track3) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_setmag","in":["' + icdev.toString() + '","' + mode.toString() + '","' + track1.toString() + '","' + track2.toString() + '","' + track3.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_GetMag(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_GetMag","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if(result[0]===0)
  {
  	result[1]=obj.out[0]
  	result[2]=obj.out[1]
  	result[3]=obj.out[2]
  	result[4]=obj.out[3]
  }

  return result
}

async function dc_MagFormatConfig( icdev,  mode)
{
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_MagFormatConfig","in":["' + icdev.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result	
}

async function dc_Set2DBarcodeConfig( icdev,  mode)
{
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_Set2DBarcodeConfig","in":["' + icdev.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result	
}





async function dc_setdevicebaud( icdev,  baud)
{
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_setdevicebaud","in":["' + icdev.toString() + '","' + baud.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result	
}


async function dc_SetCpuCard616C( icdev,  value)
{
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SetCpuCard616C","in":["' + icdev.toString() + '","' + value.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result	
}

async function dc_SetReaderModel( icdev,  model)
{
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SetReaderModel","in":["' + icdev.toString() + '","' + model.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result	
}

async function dc_GetReaderModel(icdev)
{
	let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_GetReaderModel","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    
  }


  return result	
}

async function dc_Get2DBarcodeConfig(icdev)
{
	let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_Get2DBarcodeConfig","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    
  }


  return result	
}


async function dc_GetCpuCard616C(icdev)
{
	let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_GetCpuCard616C","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    
  }
  return result	
}

async function dc_GetDeviceBaud(icdev)
{
	let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_GetDeviceBaud","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    
  }
  return result	
}

async function dc_LedBrightnessRead( icdev,  number)
{
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_LedBrightnessRead","in":["' + icdev.toString() + '","' + number.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result	
}

async function dc_LedBrightnessControl( icdev, number,  step,  stepless)
{
	
	let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_LedBrightnessControl","in":["' + icdev.toString() + '","' + number.toString() + '","' + step.toString() + '","' + stepless.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}


async function dc_LedBrightnessSave( icdev,  number)
{
	
	let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_LedBrightnessSave","in":["' + icdev.toString() + '","' + number.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_GetLastResponseCode(icdev)
{
	let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_GetLastResponseCode","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    
  }


  return result	
}

async function dc_ReadOutEeprom( icdev,  offset,  length)
{
	let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_ReadOutEeprom","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    
  }

  return result
}

async function Dcrf32_dc_ReadSystemConfigArea( sign,icdev,  offset,  length)
{
	let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"Dcrf32_dc_ReadSystemConfigArea","in":["' + sign.toString() + '","' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    
  }

  return result
}

async function dc_WriteOutEeprom( icdev,  offset,  length, data_buffer)
{
	let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_WriteOutEeprom","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '","' + data_buffer.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function Dcrf32_dc_WriteSystemConfigArea(sign, icdev,  offset,  length, data_buffer)
{
	let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"Dcrf32_dc_WriteSystemConfigArea","in":["' + sign.toString() + '","' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '","' + data_buffer.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_ModuleOutInControl( icdev,  mode,  slen, sdata)
{
	let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_ModuleOutInControl","in":["' + icdev.toString() + '","' + mode.toString() + '","' + slen.toString() + '","' + sdata.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }
  return result	
}


async function dc_GetModuleParameters( icdev,  number,  sub_number,  slen, sdata)
{
	let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_GetModuleParameters","in":["' + icdev.toString() + '","' + number.toString() + '","' + sub_number.toString() + '","' + slen.toString() + '","' + sdata.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }

  return result		
}


async function dc_SetModuleParameters( icdev,  number,  sub_number,  slen, sdata)
{
	let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SetModuleParameters","in":["' + icdev.toString() + '","' + number.toString() + '","' + sub_number.toString() + '","' + slen.toString() + '","' + sdata.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result			
}


async function dc_ReadOutEepromLogNumber( icdev)
{
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_ReadOutEepromLogNumber","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = parseInt(obj.out[1])
  }
  return result		
}


async function dc_CleanOutEeprom( icdev)
{
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_CleanOutEeprom","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result			
}



async function dc_resetdevice( icdev)
{
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_resetdevice","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result	
}

async function dc_SetRtcTimeOnOff( icdev,  type, number,  hour,  minute,  second)
{
	let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SetRtcTimeOnOff","in":["' + icdev.toString() + '","' + type.toString() + '","' + number.toString() + '","' + hour.toString() + '","' + minute.toString() + '","' + second.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result			
}

async function dc_GetRtcTimeOnOff( icdev, type,  number)
{
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_GetRtcTimeOnOff","in":["' + icdev.toString() + '","' + type.toString() + '","' + number.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if(result[0] === 0)
  {
  	result[1]=obj.out[0]
  	result[2]=obj.out[1]
  	result[3]=obj.out[2]
  }

  return result	
	
}


async function dc_ClearRtcTimeOnOff( icdev,  type,  number)
{
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_ClearRtcTimeOnOff","in":["' + icdev.toString() + '","' + type.toString() + '","' + number.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result		
}


async function dc_settime( icdev,time)
{
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_settime","in":["' + icdev.toString() + '","' + time.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result			
}


async function dc_gettime( icdev)
{
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_gettime","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if(result[0] === 0)
  {
  	result[1] = obj.out[0]
  }

  return result	
}

async function dc_displcd(icdev, flag) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_displcd","in":["' + icdev.toString() + '","' + flag.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_play_voice(icdev, mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_play_voice","in":["' + icdev.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_getinputpass(icdev, ctime) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_getinputpass","in":["' + icdev.toString() + '","' + ctime.toString() + '"]}'
  outStr = await callDcrf32(inStr, ctime * 1000 + 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }

  return result
}

async function dc_srd_eeprom(icdev, offset, length) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_srd_eeprom","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_swr_eeprom(icdev, offset, length, send_buffer) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_swr_eeprom","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '","' + send_buffer + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_load_key(icdev, _Mode, _SecNr, _NKey) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_load_key","in":["' + icdev.toString() + '","' + _Mode.toString() + '","' + _SecNr.toString() + '","' + _NKey + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_startreadmag(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_startreadmag","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_stopreadmag(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_stopreadmag","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_readmag(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_readmag","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    result[2] = parseInt(obj.out[1])
    result[3] = obj.out[2]
    result[4] = parseInt(obj.out[3])
    result[5] = obj.out[4]
    result[6] = parseInt(obj.out[5])
  }

  return result
}

async function dc_setcpu(icdev, _Byte) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_setcpu","in":["' + icdev.toString() + '","' + _Byte.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_setcpupara(icdev, cputype, cpupro, cpuetu) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_setcpupara","in":["' + icdev.toString() + '","' + cputype.toString() + '","' + cpupro.toString() + '","' + cpuetu.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SetCpuVoltage(icdev, voltage) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SetCpuVoltage","in":["' + icdev.toString() + '","' + voltage.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_cpureset(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_cpureset","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }

  return result
}

async function dc_cpuapduInt(icdev, slen, sendbuffer) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_cpuapduInt","in":["' + icdev.toString() + '","' + slen.toString() + '","' + sendbuffer + '"]}'
  outStr = await callDcrf32(inStr, 65000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }

  return result
}

async function dc_cpudown(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_cpudown","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_reset(icdev, _Msec) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_reset","in":["' + icdev.toString() + '","' + _Msec.toString() + '"]}'
  outStr = await callDcrf32(inStr, _Msec * 10 + 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_config_card(icdev, cardtype) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_config_card","in":["' + icdev.toString() + '","' + cardtype.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_card_n(icdev, _Mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_card_n","in":["' + icdev.toString() + '","' + _Mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }

  return result
}

async function dc_pro_resetInt(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_pro_resetInt","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }

  return result
}

async function dc_pro_commandlinkInt(icdev, slen, sendbuffer, timeout) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_pro_commandlinkInt","in":["' + icdev.toString() + '","' + slen.toString() + '","' + sendbuffer + '","' + timeout.toString() + '"]}'
  outStr = await callDcrf32(inStr, timeout * 250 + 15000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }

  return result
}

async function dc_card_b(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_card_b","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_authentication_pass(icdev, _Mode, _Addr, passbuff) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_authentication_pass","in":["' + icdev.toString() + '","' + _Mode.toString() + '","' + _Addr.toString() + '","' + passbuff + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_read(icdev, _Adr) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_read","in":["' + icdev.toString() + '","' + _Adr.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_write(icdev, _Adr, _Data) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_write","in":["' + icdev.toString() + '","' + _Adr.toString() + '","' + _Data + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_initval(icdev, _Adr, _Value) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_initval","in":["' + icdev.toString() + '","' + _Adr.toString() + '","' + _Value.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_increment(icdev, _Adr, _Value) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_increment","in":["' + icdev.toString() + '","' + _Adr.toString() + '","' + _Value.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_decrement(icdev, _Adr, _Value) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_decrement","in":["' + icdev.toString() + '","' + _Adr.toString() + '","' + _Value.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_readval(icdev, _Adr) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_readval","in":["' + icdev.toString() + '","' + _Adr.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
  }

  return result
}

async function dc_write_24c(icdev, offset, length, snd_buffer) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_write_24c","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '","' + snd_buffer + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_read_24c(icdev, offset, length) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_read_24c","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_write_24c64(icdev, offset, length, snd_buffer) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_write_24c64","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '","' + snd_buffer + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_read_24c64(icdev, offset, length) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_read_24c64","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_verifypin_4442(icdev, passwd) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_verifypin_4442","in":["' + icdev.toString() + '","' + passwd + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_read_4442(icdev, offset, length) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_read_4442","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_write_4442(icdev, offset, length, data_buffer) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_write_4442","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '","' + data_buffer + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_readprotect_4442(icdev, offset, length) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_readprotect_4442","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_writeprotect_4442(icdev, offset, length, data_buffer) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_writeprotect_4442","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '","' + data_buffer + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_verifypin_4428(icdev, passwd) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_verifypin_4428","in":["' + icdev.toString() + '","' + passwd + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_read_4428(icdev, offset, length) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_read_4428","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_write_4428(icdev, offset, length, data_buffer) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_write_4428","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '","' + data_buffer + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_readprotect_4428(icdev, offset, length) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_readprotect_4428","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_writeprotect_4428(icdev, offset, length, data_buffer) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_writeprotect_4428","in":["' + icdev.toString() + '","' + offset.toString() + '","' + length.toString() + '","' + data_buffer + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_read_idcard(icdev, times) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_read_idcard","in":["' + icdev.toString() + '","' + times.toString() + '"]}'
  outStr = await callDcrf32(inStr, times * 1000 + 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_inventory(icdev, flags, AFI, masklen) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_inventory","in":["' + icdev.toString() + '","' + flags.toString() + '","' + AFI.toString() + '","' + masklen.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }

  return result
}

async function dc_stay_quiet(icdev, flags, UID) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_stay_quiet","in":["' + icdev.toString() + '","' + flags.toString() + '","' + UID + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_select_uid(icdev, flags, UID) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_select_uid","in":["' + icdev.toString() + '","' + flags.toString() + '","' + UID + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_reset_to_ready(icdev, flags, UID) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_reset_to_ready","in":["' + icdev.toString() + '","' + flags.toString() + '","' + UID + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_readblock(icdev, flags, startblock, blocknum, UID) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_readblock","in":["' + icdev.toString() + '","' + flags.toString() + '","' + startblock.toString() + '","' + blocknum.toString() + '","' + UID + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }

  return result
}

async function dc_writeblock(icdev, flags, startblock, blocknum, UID, wlen, wbuffer) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_writeblock","in":["' + icdev.toString() + '","' + flags.toString() + '","' + startblock.toString() + '","' + blocknum.toString() + '","' + UID + '","' + wlen.toString() + '","' + wbuffer + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_lock_block(icdev, flags, block, UID) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_lock_block","in":["' + icdev.toString() + '","' + flags.toString() + '","' + block.toString() + '","' + UID + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_write_afi(icdev, flags, AFI, UID) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_write_afi","in":["' + icdev.toString() + '","' + flags.toString() + '","' + AFI.toString() + '","' + UID + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_lock_afi(icdev, flags, AFI, UID) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_lock_afi","in":["' + icdev.toString() + '","' + flags.toString() + '","' + AFI.toString() + '","' + UID + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_write_dsfid(icdev, flags, DSFID, UID) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_write_dsfid","in":["' + icdev.toString() + '","' + flags.toString() + '","' + DSFID.toString() + '","' + UID + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_lock_dsfid(icdev, flags, DSFID, UID) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_lock_dsfid","in":["' + icdev.toString() + '","' + flags.toString() + '","' + DSFID.toString() + '","' + UID + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_get_systeminfo(icdev, flags, UID) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_get_systeminfo","in":["' + icdev.toString() + '","' + flags.toString() + '","' + UID + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }

  return result
}

async function dc_get_securityinfo(icdev, flags, startblock, blocknum, UID) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_get_securityinfo","in":["' + icdev.toString() + '","' + flags.toString() + '","' + startblock.toString() + '","' + blocknum.toString() + '","' + UID + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }

  return result
}

async function dc_get_idsnr(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_get_idsnr","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_SamAReadSerialNumber(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SamAReadSerialNumber","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_SamAReadCardInfo(icdev, type) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SamAReadCardInfo","in":["' + icdev.toString() + '","' + type.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
    result[3] = parseInt(obj.out[2])
    result[4] = obj.out[3]
    result[5] = parseInt(obj.out[4])
    result[6] = obj.out[5]
    result[7] = parseInt(obj.out[6])
    result[8] = obj.out[7]
  }

  return result
}

async function dc_GetIdCardType(icdev, info_len, info) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_GetIdCardType","in":["' + icdev.toString() + '","' + info_len.toString() + '","' + info + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_ParseTextInfo(icdev, charset, info_len, info) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_ParseTextInfo","in":["' + icdev.toString() + '","' + charset.toString() + '","' + info_len.toString() + '","' + info + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    result[2] = obj.out[1]
    result[3] = obj.out[2]
    result[4] = obj.out[3]
    result[5] = obj.out[4]
    result[6] = obj.out[5]
    result[7] = obj.out[6]
    result[8] = obj.out[7]
    result[9] = obj.out[8]
    result[10] = obj.out[9]
  }

  return result
}

async function dc_ParseTextInfoForForeigner(icdev, charset, info_len, info) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_ParseTextInfoForForeigner","in":["' + icdev.toString() + '","' + charset.toString() + '","' + info_len.toString() + '","' + info + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    result[2] = obj.out[1]
    result[3] = obj.out[2]
    result[4] = obj.out[3]
    result[5] = obj.out[4]
    result[6] = obj.out[5]
    result[7] = obj.out[6]
    result[8] = obj.out[7]
    result[9] = obj.out[8]
    result[10] = obj.out[9]
    result[11] = obj.out[10]
    result[12] = obj.out[11]
  }

  return result
}

async function dc_ParseTextInfoForHkMoTw(icdev, charset, info_len, info) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_ParseTextInfoForHkMoTw","in":["' + icdev.toString() + '","' + charset.toString() + '","' + info_len.toString() + '","' + info + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    result[2] = obj.out[1]
    result[3] = obj.out[2]
    result[4] = obj.out[3]
    result[5] = obj.out[4]
    result[6] = obj.out[5]
    result[7] = obj.out[6]
    result[8] = obj.out[7]
    result[9] = obj.out[8]
    result[10] = obj.out[9]
    result[11] = obj.out[10]
    result[12] = obj.out[11]
    result[13] = obj.out[12]
    result[14] = obj.out[13]
  }

  return result
}

async function dc_ParseTextInfoForNewForeigner(icdev, charset, info_len, info) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_ParseTextInfoForNewForeigner","in":["' + icdev.toString() + '","' + charset.toString() + '","' + info_len.toString() + '","' + info + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    result[2] = obj.out[1]
    result[3] = obj.out[2]
    result[4] = obj.out[3]
    result[5] = obj.out[4]
    result[6] = obj.out[5]
    result[7] = obj.out[6]
    result[8] = obj.out[7]
    result[9] = obj.out[8]
    result[10] = obj.out[9]
    result[11] = obj.out[10]
    result[12] = obj.out[11]
    result[13] = obj.out[12]
    result[14] = obj.out[13]
  }

  return result
}

async function dc_ParsePhotoInfo(icdev, type, info_len, info, photo_len, photo) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_ParsePhotoInfo","in":["' + icdev.toString() + '","' + type.toString() + '","' + info_len.toString() + '","' + info + '","' + photo_len.toString() + '","' + photo + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }

  return result
}

async function dc_ParseOtherInfo(icdev, flag, in_info) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_ParseOtherInfo","in":["' + icdev.toString() + '","' + flag.toString() + '","' + in_info + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_KeypadOpen(icdev, number) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_KeypadOpen","in":["' + icdev.toString() + '","' + number.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_KeypadClose(icdev, number) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_KeypadClose","in":["' + icdev.toString() + '","' + number.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_KeypadLoadKey(icdev, number, set_index, sub_index, type, mode, key_data, key_len, flag, ex_data, ex_len) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_KeypadLoadKey","in":["' + icdev.toString() + '","' + number.toString() + '","' + set_index.toString() + '","' + sub_index.toString() + '","' + type.toString() + '","' + mode.toString() + '","' + key_data + '","' + key_len.toString() + '","' + flag.toString() + '","' + ex_data + '","' + ex_len.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    result[2] = parseInt(obj.out[1])
  }

  return result
}

async function dc_KeypadClearKey(icdev, number, set_index, sub_index) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_KeypadClearKey","in":["' + icdev.toString() + '","' + number.toString() + '","' + set_index.toString() + '","' + sub_index.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_KeypadGetKeyType(icdev, number, set_index, sub_index) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_KeypadGetKeyType","in":["' + icdev.toString() + '","' + number.toString() + '","' + set_index.toString() + '","' + sub_index.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
  }

  return result
}

async function dc_KeypadAlgorithm(icdev, number, set_index, sub_index, flag, mode, in_data, in_len) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_KeypadAlgorithm","in":["' + icdev.toString() + '","' + number.toString() + '","' + set_index.toString() + '","' + sub_index.toString() + '","' + flag.toString() + '","' + mode.toString() + '","' + in_data + '","' + in_len.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    result[2] = parseInt(obj.out[1])
  }

  return result
}

async function dc_KeypadStartInput(icdev, number, mode, set_index, sub_index, in_data, in_len, min_len, max_len, auto_end, enable_beep, time_s) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_KeypadStartInput","in":["' + icdev.toString() + '","' + number.toString() + '","' + mode.toString() + '","' + set_index.toString() + '","' + sub_index.toString() + '","' + in_data + '","' + in_len.toString() + '","' + min_len.toString() + '","' + max_len.toString() + '","' + auto_end.toString() + '","' + enable_beep.toString() + '","' + time_s.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    result[2] = parseInt(obj.out[1])
  }

  return result
}

async function dc_KeypadGetKeyValue(icdev, number) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_KeypadGetKeyValue","in":["' + icdev.toString() + '","' + number.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
  }

  return result
}

async function dc_KeypadExitAndGetInput(icdev, number, mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_KeypadExitAndGetInput","in":["' + icdev.toString() + '","' + number.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    result[2] = parseInt(obj.out[1])
  }

  return result
}

async function dc_KeypadSetKeyValue(icdev, number, value) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_KeypadSetKeyValue","in":["' + icdev.toString() + '","' + number.toString() + '","' + value.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_Scan2DBarcodeStart(icdev, mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_Scan2DBarcodeStart","in":["' + icdev.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_Scan2DBarcodeGetData(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_Scan2DBarcodeGetData","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }

  return result
}

async function dc_Scan2DBarcodeExit(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_Scan2DBarcodeExit","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function SD_IFD_GetVersion(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_GetVersion","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function SD_IFD_PlayVoice(icdev, _playmode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_PlayVoice","in":["' + icdev.toString() + '","' + _playmode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function SD_IFD_LEDDisplay(icdev, line, row, leddata, timeout) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_LEDDisplay","in":["' + icdev.toString() + '","' + line.toString() + '","' + row.toString() + '","' + leddata + '","' + timeout.toString() + '"]}'
  outStr = await callDcrf32(inStr, timeout * 1000 + 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function SD_IFD_SelecetDes(icdev, desmode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_SelecetDes","in":["' + icdev.toString() + '","' + desmode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function SD_IFD_SetMainKey(icdev, keyset, oldkey, newkey) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_SetMainKey","in":["' + icdev.toString() + '","' + keyset.toString() + '","' + oldkey + '","' + newkey + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function SD_IFD_SetWorkKey(icdev, keysetmain, keysetwork, enkeywork) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_SetWorkKey","in":["' + icdev.toString() + '","' + keysetmain.toString() + '","' + keysetwork.toString() + '","' + enkeywork + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function SD_IFD_Init(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_Init","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function SD_IFD_ActWorkKey(icdev, keysetmain, keysetwork) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_ActWorkKey","in":["' + icdev.toString() + '","' + keysetmain.toString() + '","' + keysetwork.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function SD_IFD_DesCaculate(icdev, srclen, srcdata, flag) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_DesCaculate","in":["' + icdev.toString() + '","' + srclen.toString() + '","' + srcdata + '","' + flag.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function SD_IFD_CreateMac(icdev, srclen, srcdata) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_CreateMac","in":["' + icdev.toString() + '","' + srclen.toString() + '","' + srcdata + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function SD_IFD_SetKeyLength(icdev, keylength) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_SetKeyLength","in":["' + icdev.toString() + '","' + keylength.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function SD_IFD_GetPINPro(icdev, yyflag, timeout) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_GetPINPro","in":["' + icdev.toString() + '","' + yyflag.toString() + '","' + timeout.toString() + '"]}'
  outStr = await callDcrf32(inStr, timeout * 1000 + 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function SD_IFD_GetEnPINPro(icdev, yyflag, modeflag, timeout) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_GetEnPINPro","in":["' + icdev.toString() + '","' + yyflag.toString() + '","' + modeflag.toString() + '","' + timeout.toString() + '"]}'
  outStr = await callDcrf32(inStr, timeout * 1000 + 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function SD_IFD_GetEnPINBlock(icdev, yyflag, modeflag, cardno, timeout) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_GetEnPINBlock","in":["' + icdev.toString() + '","' + yyflag.toString() + '","' + modeflag.toString() + '","' + cardno + '","' + timeout.toString() + '"]}'
  outStr = await callDcrf32(inStr, timeout * 1000 + 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function SD_IFD_Scan2DBarcodeStart(icdev, mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_Scan2DBarcodeStart","in":["' + icdev.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function SD_IFD_Scan2DBarcodeGetData(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_Scan2DBarcodeGetData","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }

  return result
}

async function SD_IFD_Scan2DBarcodeExit(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"SD_IFD_Scan2DBarcodeExit","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_GetSocialSecurityCardBaseInfo(icdev, type) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_GetSocialSecurityCardBaseInfo","in":["' + icdev.toString() + '","' + type.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    result[2] = obj.out[1]
    result[3] = obj.out[2]
    result[4] = obj.out[3]
    result[5] = obj.out[4]
    result[6] = obj.out[5]
    result[7] = obj.out[6]
    result[8] = obj.out[7]
    result[9] = obj.out[8]
    result[10] = obj.out[9]
    result[11] = obj.out[10]
    result[12] = obj.out[11]
    result[13] = obj.out[12]
    result[14] = obj.out[13]
  }

  return result
}

async function dc_GetBankAccountNumber(icdev, type) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_GetBankAccountNumber","in":["' + icdev.toString() + '","' + type.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_SelfServiceDeviceCardStatus(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceCardStatus","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
  }

  return result
}

async function dc_SelfServiceDeviceCardInject(icdev, time_s, mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceCardInject","in":["' + icdev.toString() + '","' + time_s.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, time_s * 1000 + 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceCardEject(icdev, time_s, mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceCardEject","in":["' + icdev.toString() + '","' + time_s.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, time_s * 1000 + 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceCardMove(icdev, time_s, mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceCardMove","in":["' + icdev.toString() + '","' + time_s.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, time_s * 1000 + 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceSensorStatus(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceSensorStatus","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
  }

  return result
}

async function dc_SelfServiceDeviceConfig(icdev, mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceConfig","in":["' + icdev.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceConfigFront(icdev, mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceConfigFront","in":["' + icdev.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceConfigBack(icdev, mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceConfigBack","in":["' + icdev.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceConfigPlace(icdev, mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceConfigPlace","in":["' + icdev.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceCheckCardType(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceCheckCardType","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceReset(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceReset","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceWriteMagConfig(icdev, mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceWriteMagConfig","in":["' + icdev.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceReadMagConfig(icdev, track1, track2, track3) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceReadMagConfig","in":["' + icdev.toString() + '","' + track1.toString() + '","' + track2.toString() + '","' + track3.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceShakeConfig(icdev, mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceShakeConfig","in":["' + icdev.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceSetFrontSwitch(icdev, mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceSetFrontSwitch","in":["' + icdev.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceGetFrontSwitch(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceGetFrontSwitch","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
  }

  return result
}

async function dc_SelfServiceDeviceRecoverError(icdev, type) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceRecoverError","in":["' + icdev.toString() + '","' + type.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceSensorStatusEx(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceSensorStatusEx","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
    result[2] = obj.out[1]
  }

  return result
}

async function dc_SelfServiceDeviceKeepUpDown(icdev, mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceKeepUpDown","in":["' + icdev.toString() + '","' + mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceWriteMag(icdev, t1_data, t1_len, t2_data, t2_len, t3_data, t3_len) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceWriteMag","in":["' + icdev.toString() + '","' + t1_data + '","' + t1_len.toString() + '","' + t2_data + '","' + t2_len.toString() + '","' + t3_data + '","' + t3_len.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelfServiceDeviceInit(icdev, gate_check_mode, card_move_mode, request_mode) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceInit","in":["' + icdev.toString() + '","' + gate_check_mode.toString() + '","' + card_move_mode.toString() + '","' + request_mode.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
    result[2] = parseInt(obj.out[1])
  }

  return result
}

async function dc_SelfServiceDeviceWriteMagSpeed(icdev, value) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelfServiceDeviceWriteMagSpeed","in":["' + icdev.toString() + '","' + value.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_card_exist(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_card_exist","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_MFPL0_writeperso(icdev, BNr, dataperso) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_MFPL0_writeperso","in":["' + icdev.toString() + '","' + BNr.toString() + '","' + dataperso + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_MFPL0_commitperso(icdev) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_MFPL0_commitperso","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_MFPL1_authl1key(icdev, authkey) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_MFPL1_authl1key","in":["' + icdev.toString() + '","' + authkey + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_MFPL1_switchtol2(icdev, authkey) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_MFPL1_switchtol2","in":["' + icdev.toString() + '","' + authkey + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_MFPL1_switchtol3(icdev, authkey) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_MFPL1_switchtol3","in":["' + icdev.toString() + '","' + authkey + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_MFPL2_switchtol3(icdev, authkey) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_MFPL2_switchtol3","in":["' + icdev.toString() + '","' + authkey + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_MFPL3_authl3key(icdev, keyBNr, authkey) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_MFPL3_authl3key","in":["' + icdev.toString() + '","' + keyBNr.toString() + '","' + authkey + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_MFPL3_authl3sectorkey(icdev, mode, sectorBNr, authkey) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_MFPL3_authl3sectorkey","in":["' + icdev.toString() + '","' + mode.toString() + '","' + sectorBNr.toString() + '","' + authkey + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_MFPL3_readinplain(icdev, BNr, Numblock) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_MFPL3_readinplain","in":["' + icdev.toString() + '","' + BNr.toString() + '","' + Numblock.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_MFPL3_readencrypted(icdev, BNr, Numblock, flag) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_MFPL3_readencrypted","in":["' + icdev.toString() + '","' + BNr.toString() + '","' + Numblock.toString() + '","' + flag.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_MFPL3_writeinplain(icdev, BNr, Numblock, writedata) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_MFPL3_writeinplain","in":["' + icdev.toString() + '","' + BNr.toString() + '","' + Numblock.toString() + '","' + writedata + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_MFPL3_writeencrypted(icdev, BNr, Numblock, writedata, flag) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_MFPL3_writeencrypted","in":["' + icdev.toString() + '","' + BNr.toString() + '","' + Numblock.toString() + '","' + writedata + '","' + flag.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_auth_ulc(icdev, key) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_auth_ulc","in":["' + icdev.toString() + '","' + key + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_changekey_ulc(icdev, key) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_changekey_ulc","in":["' + icdev.toString() + '","' + key + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_DeviceActivationConfig(icdev, activation_mode, work_mode, uid) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_DeviceActivationConfig","in":["' + icdev.toString() + '","' + activation_mode.toString() + '","' + work_mode.toString() + '","' + uid + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0])
  }

  return result
}

async function dc_ConfigActivationUid(work_mode, uid) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_ConfigActivationUid","in":["' + work_mode.toString() + '","' + uid + '"]}'
  outStr = await callDcrf32(inStr, 5000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_SelectAntenna(icdev, number) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_SelectAntenna","in":["' + icdev.toString() + '","' + number.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_RfCrcModeConfig(icdev, tx_crc, rx_crc) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_RfCrcModeConfig","in":["' + icdev.toString() + '","' + tx_crc.toString() + '","' + rx_crc.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_read2(icdev, flag, length, addr) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_read2","in":["' + icdev.toString() + '","' + flag.toString() + '","' + length.toString() + '","' + addr.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_write2(icdev, flag, length, addr, data) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_write2","in":["' + icdev.toString() + '","' + flag.toString() + '","' + length.toString() + '","' + addr.toString() + '","' + data + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result
}

async function dc_pwd_auth(icdev, key) {
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_pwd_auth","in":["' + icdev.toString() + '","' + key + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)
  if (result[0] === 0) {
    result[1] = obj.out[0]
  }

  return result
}

async function dc_halt( icdev)
{
  let result = new Array()
  let inStr, outStr
  let obj

  inStr = '{"func":"dc_halt","in":["' + icdev.toString() + '"]}'
  outStr = await callDcrf32(inStr, 10000)
  if (typeof (outStr) === 'undefined') {
    return
  }

  try {
    obj = JSON.parse(outStr)
  } catch (error) {
    return
  }

  result[0] = parseInt(obj.result)

  return result	
}

async function dc_getcard_version(icdev, flag) {
  let result = new Array();
  let inStr, outStr;
  let obj;

  // 构造输入字符串
  inStr = '{"func":"dc_getcard_version","in":["' + icdev.toString() + '","' + flag.toString() + '"]}';

  // 调用底层 API
  outStr = await callDcrf32(inStr, 10000);
  if (typeof (outStr) === 'undefined') {
    return;
  }

  try {
    // 解析返回的 JSON 字符串
    obj = JSON.parse(outStr);
  } catch (error) {
    return;
  }

  // 将结果存储在数组中
  result[0] = parseInt(obj.result); // 返回的状态码
  if (result[0] === 0) {
    result[1] = parseInt(obj.out[0]); // rlen
    result[2] = obj.out[1]; // rdata
  }

  return result;
}
async function dc_analyze_version(flag, index, version_data_len, version_data) {
  let result = new Array();
  let inStr, outStr;
  let obj;

  // 构造输入字符串
  inStr = '{"func":"dc_analyze_version","in":[' +
    '"' + flag.toString() + '",' +
    '"' + index.toString() + '",' +
    '"' + version_data_len.toString() + '",' +
    '"' + version_data + '"]}';

  // 调用底层 API
  outStr = await callDcrf32(inStr, 10000);
  if (typeof (outStr) === 'undefined') {
    return;
  }

  try {
    // 解析返回的 JSON 字符串
    obj = JSON.parse(outStr);
  } catch (error) {
    return;
  }

  // 将结果存储在数组中
  result[0] = parseInt(obj.result); // 返回的状态码
  if (result[0] === 0) {
    result[1] = obj.out[0]; // version_exp
  }

  return result;
}
async function dc_fast_read(icdev, flag, start_addr, end_addr) {
  let result = new Array(); // 用于存储返回结果
  let inStr, outStr;
  let obj;

  // 构造输入字符串
  inStr = JSON.stringify({
      func: "dc_fast_read",
      in: [icdev.toString(), flag.toString(), start_addr.toString(), end_addr.toString()]
  });

  // 调用底层 API
  outStr = await callDcrf32(inStr, 10000); // 假设超时时间为 10000 毫秒
  if (typeof (outStr) === 'undefined') {
      return; // 如果返回未定义，直接返回
  }

  try {
      // 解析返回的 JSON 字符串
      obj = JSON.parse(outStr);
  } catch (error) {
      return; // 如果解析失败，直接返回
  }

  // 将结果存储在数组中
  result[0] = parseInt(obj.result); // 返回的状态码
  if (result[0] === 0) {
      result[1] = parseInt(obj.out[0]); // rlen
      result[2] = obj.out[1]; // rdata
  }

  return result;
}
async function dc_auth_aes(icdev, flag, arg, authkey) {
  let result = new Array(); // 用于存储返回结果
  let inStr, outStr;
  let obj;

  // 构造输入字符串
  inStr = JSON.stringify({
      func: "dc_auth_aes",
      in: [icdev.toString(), flag.toString(), arg.toString(), authkey]
  });

  // 调用底层 API
  outStr = await callDcrf32(inStr, 10000); // 假设超时时间为 10000 毫秒
  if (typeof (outStr) === 'undefined') {
      return; // 如果返回未定义，直接返回
  }

  try {
      // 解析返回的 JSON 字符串
      obj = JSON.parse(outStr);
  } catch (error) {
      return; // 如果解析失败，直接返回
  }

  // 将结果存储在数组中
  result[0] = parseInt(obj.result); // 返回的状态码

  return result;
}
async function dc_changekey_aes(icdev, flag, arg, keylen, newkey) {
  let result = new Array(); // 用于存储返回结果
  let inStr, outStr;
  let obj;

  // 构造输入字符串
  inStr = JSON.stringify({
      func: "dc_changekey_aes",
      in: [icdev.toString(), flag.toString(), arg.toString(), keylen.toString(), newkey]
  });

  // 调用底层 API
  outStr = await callDcrf32(inStr, 10000); // 假设超时时间为 10000 毫秒
  if (typeof (outStr) === 'undefined') {
      return; // 如果返回未定义，直接返回
  }

  try {
      // 解析返回的 JSON 字符串
      obj = JSON.parse(outStr);
  } catch (error) {
      return; // 如果解析失败，直接返回
  }

  // 将结果存储在数组中
  result[0] = parseInt(obj.result); // 返回的状态码

  return result;
}