
import { Button } from 'ms-ui-components'
import { loggerBeautifulObject } from '@sokritha-sabaicode/ms-libs';

export default function Home() {

  loggerBeautifulObject({
    foo: 'bar',
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button />
    </main>
  );
}
