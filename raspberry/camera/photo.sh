curl -X POST \
  https://raspi.jiri-matula.cz/graphql \
  -H 'cache-control: no-cache' \
  -H 'content-type: multipart/form-data' \
  -F 'query=mutation photo { recordPhoto { link createdAt } }' \
  -F 'photo=@/tmp/pic01.jpg'
