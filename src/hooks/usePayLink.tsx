import { CanonicalToken, HopBridge } from '@hop-protocol/sdk'
import { useMemo } from 'react'
import { hopAppNetwork } from 'src/config'
import logger from 'src/logger'
import Network from 'src/models/Network'
import { useQuery } from "react-query"
import axios from 'axios'

var config = {
  headers: { 'Access-Control-Allow-Origin': '*' }
};

const getOrder = async(orderId) => {
  const url = "http://localhost:9090/orders/" + orderId
  const res = await axios.get(url, config)
  return res.data;
};

//Access-Control-Allow-Origin: *

export function usePayLink(orderId) {
  // Set destination token
  const merchantName = 'test';
  const { data } = useQuery(['order', orderId], () => getOrder(orderId))
  const merchantId = data?.merchantId;
  const orderAmount = data?.amount.toString();
  // const orderMeta = '0xd184d1db3ad1ca22adb6e4ee33df37f44e5460f2;2124049464619434000'
  const orderMeta = data?.orderMeta;
  
  return {
    merchantId,
    merchantName,
    orderId,
    orderMeta,
    orderAmount
  }
}
