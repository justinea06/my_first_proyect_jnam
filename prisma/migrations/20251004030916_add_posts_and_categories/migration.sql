-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostCategory" (
    "postId" INTEGER NOT NULL,
    "caregoryId" INTEGER NOT NULL,

    CONSTRAINT "PostCategory_pkey" PRIMARY KEY ("postId","caregoryId")
);

-- AddForeignKey
ALTER TABLE "PostCategory" ADD CONSTRAINT "PostCategory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCategory" ADD CONSTRAINT "PostCategory_caregoryId_fkey" FOREIGN KEY ("caregoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
