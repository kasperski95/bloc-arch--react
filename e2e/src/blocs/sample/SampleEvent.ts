import { BlocEvent } from '@bloc-arch/core'

export abstract class SampleEvent extends BlocEvent {}

export class Foo extends SampleEvent {}
