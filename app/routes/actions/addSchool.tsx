import { ActionFunction, redirect } from 'remix';
export let action: ActionFunction = async ({ request }) => {
    let formData = await request.formData();
    console.log("formData", formData);
    return redirect("/");
}