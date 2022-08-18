import { Badge, Card, Group, Image, Text } from "@mantine/core"


type InfoCardProps = {
  data: any
}

export default function InfoCard({ data }: InfoCardProps) {
    // this is for to trim the title for responsive
    const trimTitle = (title: string) => {
    if (title.length > 20) {
      return title.substring(0, 20) + "..."
    } else {
      return title
    }
  }

  return (
    <Card mt="sm" shadow="sm">
      <Group position="apart">
        <div>
          <Text size="sm" weight={500}>
            {trimTitle(data.title)}
          </Text>
          <Badge size="sm" color="pink" variant="light">
            {data.url}
          </Badge>
        </div>
        {/* <div> */}
        <Card.Section>
          <Image
            src={data.image}
            height={80}
            width={80}
            radius="md"
            //  fit="contain"
            withPlaceholder
          />
        </Card.Section>
        {/* </div> */}
      </Group>
    </Card>
  )
}
