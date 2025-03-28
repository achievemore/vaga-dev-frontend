export interface ListagemUsuariosApiDto {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: UsuarioSistema[];
}

export interface UsuarioSistema {
    first_name: string;
    last_name: string;

}