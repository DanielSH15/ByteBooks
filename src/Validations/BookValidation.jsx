import * as yup from 'yup'

export const bookSchema = yup.object().shape({
    name: yup.string().matches(/^[A-Z][A-Za-z0-9 ]*$/, 'Name should start with a capital letter and should not include special characters.').required("Name is required"),
    genres: yup.array().min(1, "Book genres are required"),
    author: yup.string().required("Author is required"),
    description: yup.string().required("Description is required"),
    releaseDate: yup.string().required("Release date is required"),
    pages: yup.string().required("Number of pages is required"),
    photoFileName: yup.string().required("Photo file name is required"),
    previewLink: yup.string().required("Preview link is required")
})