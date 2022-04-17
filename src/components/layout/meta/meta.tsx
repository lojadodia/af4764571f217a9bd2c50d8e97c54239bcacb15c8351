const Meta = () => {

  return (
    <>
       <title>{process.env.NEXT_APP_TITLE}</title>
        <meta  name="description" content={process.env.NEXT_APP_DESCRIPTION} />
        <link rel="icon" type="image/png" href={process.env.NEXT_APP_ICON} />
    </>
  )  
};
export default Meta;
