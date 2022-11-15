import { useState, useCallback } from 'react'
import { BigNumber, constants } from 'ethers'
import logger from 'src/logger'
import Transaction from 'src/models/Transaction'
import { Token, ChainSlug } from '@hop-protocol/sdk'
import { useApp } from 'src/contexts/AppContext'
import Network from 'src/models/Network'

export enum MethodNames {
  convertTokens = 'convertTokens',
  wrapToken = 'wrapToken',
}

async function estimateGasCost(network: Network, estimatedGasLimit: BigNumber) {
  try {
    // Get current gas price
    const gasPrice = await network.provider.getGasPrice()
    // Add some wiggle room
    const bufferGas = BigNumber.from(70_000)
    return estimatedGasLimit.add(bufferGas).mul(gasPrice)
  } catch (error) {
    logger.error(error)
  }
}

export function useEstimateTxCost(amountOut, orderMeta, selectedNetwork?: Network) {
  const { sdk } = useApp()
  const [tx, setTx] = useState<Transaction | null>(null)

  // { destNetwork: Network; network: Network }
  const estimateConvertTokens = useCallback(
    async (options: any) => {
      const { token, network, destNetwork } = options

      if (!(sdk && network && destNetwork?.slug)) {
        return
      }

      const bridge = sdk.bridge(token.symbol)

      // const estimatedGasLimit = await bridge.estimateSendHTokensGasLimit(
      //   '420',
      //   network.slug,
      //   destNetwork.slug,
      //   {
      //     bonderFee: '0',
      //   }
      // )

      // if (estimatedGasLimit) {
      //   const gasCost = await estimateGasCost(network, estimatedGasLimit)
      //   return gasCost
      // }
      return BigNumber.from(0)
    },
    [sdk, selectedNetwork]
  )

  const estimateSend = useCallback(
    async options => {
      const { fromNetwork, toNetwork, token, deadline } = options
      if (!(sdk && fromNetwork && toNetwork && deadline)) {
        return
      }

      try {
        const bridge = sdk.bridge(token.symbol)

        const estimatedGasLimit = await bridge.estimatePayGasLimit(
          '10',
          orderMeta,
          fromNetwork.slug as string
        )

        console.log('estimatedGasLimit %s,', estimatedGasLimit)

        if (estimatedGasLimit) {
          const gasCost = await estimateGasCost(fromNetwork, estimatedGasLimit)

          return gasCost
        }

      } catch (error) {
        logger.error(error)
      }
    },
    [sdk, selectedNetwork]
  )

 

  // Master send method
  const estimateMaxValue = useCallback(
    async (methodName: string, options?: any) => {
      console.log(`estimateMaxValue options:`, options)
      if (!methodName) {
        return
      }

      try {
        switch (methodName) {
          case MethodNames.convertTokens: {
            return BigNumber.from(0)
          }

          default:
            break
        }
      } catch (error) {
        logger.error(error)
      }
    },
    [sdk, selectedNetwork]
  )

  return {
    estimateMaxValue,
    estimateSend,
    tx,
    setTx,
  }
}
