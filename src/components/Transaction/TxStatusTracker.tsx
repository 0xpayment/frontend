import React, { useMemo } from 'react'
import { Div, Flex } from 'src/components/ui'
import RightArrow from '@material-ui/icons/ArrowRightAlt'
import { TransactionStatus, useTxStatusStyles } from 'src/components/Transaction'
import { useApp } from 'src/contexts/AppContext'
import { findNetworkBySlug } from 'src/utils/networks'

function TxStatusTracker({ tx, completed, destCompleted, confirmations, networkConfirmations }) {
  const styles = useTxStatusStyles()
  const network = useMemo(() => findNetworkBySlug(tx.networkName), [tx])

  return (
    <Div mb={4}>

      <Flex justifyContent="space-evenly" alignCenter mt={3}>
        <TransactionStatus
          txConfirmed={completed}
          link={tx.explorerLink}
          networkName={tx.networkName}
          destNetworkName={tx.destNetworkName}
          styles={styles}
          confirmations={confirmations}
          networkWaitConfirmations={networkConfirmations}
        />
      </Flex>
    </Div>
  )
}

export default TxStatusTracker
