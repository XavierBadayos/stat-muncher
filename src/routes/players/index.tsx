import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/players/')({
  component: Players,
})

function Players() {
  return (
    <div className='p-12 grid grid-cols-5 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Kawhi Leonard</CardTitle>
          <CardDescription>The Klaw</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Boardman gets paid.</p>
      </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Kawhi Leonard</CardTitle>
          <CardDescription>The Klaw</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Boardman gets paid.</p>
      </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Kawhi Leonard</CardTitle>
          <CardDescription>The Klaw</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Boardman gets paid.</p>
      </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Kawhi Leonard</CardTitle>
          <CardDescription>The Klaw</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Boardman gets paid.</p>
      </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Kawhi Leonard</CardTitle>
          <CardDescription>The Klaw</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Boardman gets paid.</p>
      </CardContent>
      </Card>
    </div>
  )
}
