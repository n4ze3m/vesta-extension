import { ActionIcon, Anchor, Button, Text, Textarea } from "@mantine/core"
import { useForm } from "@mantine/hooks"
import { useMutation } from "react-query"

import useLocal from "~utils/useLocal"



const endpoint = "https://vesta-list.vercel.app/api/keep/add"

export default function SaveKeep() {
  const { value: userId, remove } = useLocal("token")

  const form = useForm({
    initialValues: {
      note: ""
    }
  })

  const onFormSubit = async (e: any) => {
    let requestHeaders: any = {
      'user_id': userId, 'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    await fetch(endpoint, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(e)
    })
  }

  const { mutateAsync: saveNote, isLoading: isSaving } = useMutation(
    onFormSubit,
    {
      onSuccess: () => {
        form.reset()
      }
    }
  )

  return (
    <div
      style={{
        marginTop: "10px"
      }}>
      {userId && (
        <ActionIcon
          onClick={() => remove()}
          title="Logout"
          mb="md"
          color="red"
          size="md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </ActionIcon>
      )}
      <form onSubmit={form.onSubmit((values) => saveNote(values))}>
        <Textarea
          placeholder="Add a note"
          mb="sm"
          autosize
          minRows={5}
          maxRows={9}
          {...form.getInputProps("note")}
        />
        <Button
          disabled={!userId}
          loading={isSaving}
          type="submit"
          color={"teal"}
          fullWidth>
          Save
        </Button>
      </form>
      {!userId && (
        <Text mt="md" color="red">
          Oh no, look like you are not connected with Vesta. Please{" "}
          <Anchor
            target={"_blank"}
            href="https://vesta-list.vercel.app/settings">
            Connect to Vesta
          </Anchor>{" "}
          and try again.
        </Text>
      )}
    </div>
  )
}
