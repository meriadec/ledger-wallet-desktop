// @flow

import React, { Fragment } from 'react'

import type { Account, T } from 'types/common'
import type { DoubleVal } from 'components/RequestAmount'

import Box from 'components/base/Box'
import SelectAccount from 'components/SelectAccount'
import Label from 'components/base/Label'
import LabelInfoTooltip from 'components/base/LabelInfoTooltip'
import RecipientAddress from 'components/RecipientAddress'
import RequestAmount from 'components/RequestAmount'
import Select from 'components/base/Select'
import Input, { Textarea } from 'components/base/Input'
import Spoiler from 'components/base/Spoiler'
import CheckBox from 'components/base/CheckBox'

type Props = {
  account: Account | null,
  onChange: Function,
  recipientAddress: string,
  amount: DoubleVal,
  isRBF: boolean,
  t: T,
}

function StepAmount(props: Props) {
  const { onChange, account, recipientAddress, t, amount, isRBF } = props

  return (
    <Box flow={4}>
      {/*                                                                    */}
      {/*                      ACCOUNT SELECTION                             */}
      {/*                                                                    */}
      <Box flow={1}>
        <Label>{t('send:steps.amount.selectAccountDebit')}</Label>
        <SelectAccount onChange={onChange('account')} value={account} />
      </Box>

      {/*                                                                    */}
      {/*                      RECIPIENT ADDRESS                             */}
      {/*                                                                    */}
      <Box flow={1}>
        <Label>
          <span>{t('send:steps.amount.recipientAddress')}</span>
          <LabelInfoTooltip ml={1} text={t('send:steps.amount.recipientAddress')} />
        </Label>
        <RecipientAddress
          withQrCode
          value={recipientAddress}
          onChange={onChange('recipientAddress')}
        />
      </Box>

      {account && (
        <Fragment>
          {/*                                                                */}
          {/*                        AMOUNT                                  */}
          {/*                                                                */}
          <Box flow={1}>
            <Label>{t('send:steps.amount.amount')}</Label>
            <RequestAmount account={account} onChange={onChange('amount')} value={amount} />
          </Box>

          {/*                                                                */}
          {/*                         FEES                                   */}
          {/*                                                                */}
          <Box flow={1}>
            <Label>
              <span>{t('send:steps.amount.fees')}</span>
              <LabelInfoTooltip ml={1} text={t('send:steps.amount.fees')} />
            </Label>
            <Box horizontal flow={5}>
              <Select
                style={{ width: 200 }}
                items={[{ key: 'custom', name: 'Custom' }]}
                value={{ key: 'custom', name: 'Custom' }}
                renderSelected={item => item.name}
                onChange={onChange('fees')}
              />
              <Input containerProps={{ grow: true }} />
            </Box>
          </Box>

          {/*                                                                */}
          {/*                  ADVANCED OPTIONS                              */}
          {/*                                                                */}
          <Spoiler title="Advanced options">
            {/*                 */}
            {/* RBF transaction */}
            {/*                 */}
            <Box horizontal align="center" flow={5}>
              <Box style={{ width: 200 }}>
                <Label>
                  <span>{t('send:steps.amount.useRBF')}</span>
                  <LabelInfoTooltip ml={1} text={t('send:steps.amount.useRBF')} />
                </Label>
              </Box>
              <Box grow>
                <CheckBox isChecked={isRBF} onChange={onChange('isRBF')} />
              </Box>
            </Box>

            {/*         */}
            {/* Message */}
            {/*         */}
            <Box horizontal align="flex-start" flow={5}>
              <Box style={{ width: 200 }}>
                <Label>
                  <span>{t('send:steps.amount.message')}</span>
                </Label>
              </Box>
              <Box grow>
                <Textarea />
              </Box>
            </Box>
          </Spoiler>
        </Fragment>
      )}
    </Box>
  )
}

export default StepAmount