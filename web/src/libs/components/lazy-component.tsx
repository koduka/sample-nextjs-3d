export async function LazyComponent() {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 10000)
  })

  return <div>LazyComponent</div>
}
