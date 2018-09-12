import {
  convertTimeFormat,
  setTitle,
  generateUID,
  throttle
} from '../index'

jest.useFakeTimers()

describe(
  'Utils',
  () => {
    test(
      'Convert time to local string',
      () => {
        const timeString = '2018-08-22T02:19:40'

        const localTimeString = convertTimeFormat(timeString)

        expect(localTimeString).toBe('2018年8月22日 上午2:19')
      }
    )

    test(
      'Set title with site title',
      () => {
        const testTitle = 'Test Title x 无敌筋斗雷'
        setTitle(testTitle)

        expect(document.title).toBe(testTitle)
      }
    )

    test(
      'Set title without site title',
      () => {
        const testTitle = 'Test Title'
        setTitle(testTitle)

        expect(document.title).toBe(`${testTitle} | 无敌筋斗雷`)
      }
    )

    test(
      'Generate UID',
      () => {
        const REG_UID = /^[0-9a-zA-Z]+-[0-9]+-[0-9]+$/g

        const uid = generateUID()

        expect(REG_UID.test(uid)).toBe(true)
      }
    )

    test(
      'Throttle',
      () => {
        let counter = 0
        const increase = () => counter++

        const throttledIncrease = () => throttle(increase, 32)

        throttledIncrease()
        throttledIncrease()

        jest.advanceTimersByTime(64)
        
        expect(counter).toBe(1)
      }
    )
  }
)
