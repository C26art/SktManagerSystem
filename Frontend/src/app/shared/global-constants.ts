export class GlobalConstants {

  public static readonly genericError: string = "Something went wrong. Please try again later!";
  public static readonly unauthorized: string = "You are not authorized person to access this page.";
  public static readonly productExistErro: string = "Public already exist.";
  public static readonly productAdded: string = "Public added successfully.";
  public static readonly nameRegex: string = "[a-zA-Z ]+";
  public static readonly emailRegex: string = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[a-zA-Z]{2,3}";
  public static readonly contactNumberRegex: string = "^\\(?\\d{2,3}\\)?[\\s-]?\\d{3,4}[\\s-]?\\d{4,5}$|^\\d{8,10}$|^\\(?\\d{3}\\)?[\\s-]?\\d{3}[\\s-]?\\d{4}$";
  public static readonly error: string = "error";

}
